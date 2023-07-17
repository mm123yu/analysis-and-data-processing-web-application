import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import firebase from 'firebase/compat'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthencationService {
  isLoggedIn = false

  user!: Observable<firebase.User | null>

  constructor(private auth: AngularFireAuth, private router: Router  ) {
    this.user = this.auth.user
    // this.auth.authState.subscribe((user)=> this.user = user)
  }
 async signin(email: string, password: string) {
    // this.auth.setPersistence('session').then(() => {
      await this.auth.signInWithEmailAndPassword(email, password).then((res) => {
        this.isLoggedIn = true
        sessionStorage.setItem('user', JSON.stringify(res.user))
      })
        // return setPersistence(this.auth1, browserSessionPersistence).then(() =>
        //   signInWithEmailAndPassword(this.auth1, email, password).then((res)=>{
        //     this.isLoggedIn = true
        // localStorage.setItem('user', JSON.stringify(res.user))
        //   })
        // );
    }

  async signup(email: string, password: string) {
    await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true
        sessionStorage.setItem('user', JSON.stringify(res.user))
      })
  }
  logout() {
    this.auth.signOut()
    this.isLoggedIn  = false
    localStorage.removeItem('user')
    this.router.navigate([''])
  }
}

