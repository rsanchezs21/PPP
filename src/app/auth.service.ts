import { Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs } from "@angular/fire/firestore";

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
}