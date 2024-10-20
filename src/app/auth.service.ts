import { Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, collectionData, QuerySnapshot, doc, getDoc } from "@angular/fire/firestore";
import { from, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap } from "rxjs";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  ref: any;
  upload: any;
    constructor(private firestore: Firestore, private router:Router, private afAuth:AngularFireAuth){}

        getUsers(): Observable<any[]>{
            const usersCollection = collection(this.firestore, 'users');
            return collectionData(usersCollection, {idField: 'id'});
        }

        getFilteredUsers(nombre: string, pais: string, apodo:string): Observable<any[]>{
            let usersCollection = collection(this.firestore, 'users');
            let q = query(usersCollection);

            if (nombre){
                q = query(q, where('name','==',nombre));
            }

            if (pais){
                q = query(q, where('country','==',pais));
            }

            if (apodo){
                q = query(q, where('nickname','==',apodo));
            }

            return from(getDocs(q).then(QuerySnapshot =>
                QuerySnapshot.docs.map(doc => doc.data())
            ));
        }

    async loginAndCheckFirestore(email: string, password: string): Promise<any> {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
          const userId = user.uid;

          // Usa la API modular para obtener el documento
          const userDocRef = doc(this.firestore, `User_AD/${userId}`);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            // Usuario autorizado
            return { authorized: true, user };
          } else {
            // Usuario no autorizado
            throw new Error('Usuario no autorizado');
          }
        }
      } catch (error) {
        console.error('Error en login o verificación:', error);
        throw error;
      }
    }

    // Observable para obtener el estado del usuario autenticado
  getUserData(): Observable<{ displayName: string | null, email: string | null, photoURL: string | null } | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          const userDocRef = doc(this.firestore, `User_AD/${userId}`);
          return getDoc(userDocRef).then(userSnapshot => {
            const userData = userSnapshot.exists() ? userSnapshot.data() : {};
            const displayName = user.displayName || userData['NOMBRE'] || 'Usuario';
            const photoURL = user.photoURL || userData['FOTO'] || null;
            return {
              displayName,
              email: user.email,
              photoURL
            };
          });
        } else {
          return of(null); // No hay usuario autenticado
        }
      })
    );
  }


}
