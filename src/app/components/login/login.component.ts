import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User()
  constructor(
      private authServ:AuthService,
      private router:Router          
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.authServ.onLogin(this.user).then(
      response => {
        if (response?.user?.emailVerified) {
          this.router.navigate(['/panel']);
        }
      }
    )
  }

  register(){
    this.router.navigate(['/register']);
  }
}
