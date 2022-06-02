import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Router } from '@angular/router';
import { User } from '../classes/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(
    public afAuth: AngularFireAuth,
    //private router: Router
    ) {
    afAuth.authState.subscribe(user => (this.isLogged = user));

   }

   async onLogin(user:User){
     try {
       return await this.afAuth.signInWithEmailAndPassword(user.email,user.password);
     } catch (error) {
       return undefined;
       console.log("error" + error);
     }
   }

   async onRegister(user:User){
     try {
       return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
     } catch (error) {
       return error;
       console.log('error', error);
     }
   }

   getCurrentUser() {
    return this.afAuth.currentUser;
  }

  logout() {
    this.afAuth.signOut();
  }
}
