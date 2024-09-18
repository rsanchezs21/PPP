import { Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, collectionData, QuerySnapshot } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'  
})
export class AuthService {
    constructor(private firestore: Firestore){}

        async login(email: string, password: string): Promise<boolean>{
            const usersCollection = collection(this.firestore, 'User_AD');
            const q = query(usersCollection, where('CORREO', '==' , email), where('CONTRASENA', '==' ,password));

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty){
                return true;
            }else{
                return false;
            }
        }

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
}