import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User()
  constructor(
      private authServ:AuthService,
      private userServ:UserService,
      private router:Router          
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.authServ.onLogin(this.user).then(
      response => {
        if (response?.user?.emailVerified) {
          this.userServ.getElements().where('email', '==', response.user.email).get().then(
            response => {
              response.docs.map((element:any)=>{
                let data = element.data();
                console.log(data);
                if (data.profile == 'Especialista' && !data.isActive) {
                  alert('Su usuario no esta activado')
                  return
                }
                
                this.user.id = element.id;
                this.user.fistName = data.fistName;
                this.user.lastName = data.lastName;
                this.user.age = data.age;
                this.user.dni = data.dni;
                this.user.email = data.email;
                this.user.password = data.password;
                this.user.profile = data.profile;
                this.user.profileImgOne = data.profileImgOne;
                this.userServ.getProfilePhoto(this.user.profileImgOne).then(
                  response=>{
                    this.user.imageOne = response;
                  }
                )
                if (this.user.profile == 'Paciente') {
                  this.user.obraSocial = data.obraSocial;
                  
                  this.user.profileImgTwo = data.profileImgTwo;
                  this.userServ.getProfilePhoto(this.user.profileImgTwo).then(
                    response=>{
                      this.user.imageTwo = response;
                    }
                  );
                }else {
                  this.user.speciality = data.speciality;
                }

                this.authServ.saveUser(this.user);
                this.router.navigate(['/panel']);
              })
            }
          ) 
          
        }else{
          alert('falta verificar')
        }
      }
    )
  }

  loginWithUser(email:string,password:string){
    this.user.email = email;
    this.user.password = password;
  }

  register(){
    this.router.navigate(['/register']);
  }
}
