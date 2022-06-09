import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user:User = new User();
  constructor(
    private router:Router,
    private authServ :AuthService,
    private userServ :UserService
    ) { }

  home(){
    this.router.navigate(['/home']);
  }

  quienSoy(){
    this.router.navigate(['/quien-soy']);
  }

  logOut(){
    this.authServ.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
   this.authServ.getCurrentUser().then(
     response => {
       this.userServ.getElements().where('email', '==', response?.email).get().then(
        response =>{
          response.docs.map((element:any)=>{
            let data = element.data();
          this.user.id = element.id;
          this.user.fistName = data.fistName;
          this.user.lastName = data.lastName;
          this.user.age = data.age;
          this.user.dni = data.dni;
          this.user.email = data.email;
          this.user.password = data.password
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
          })
        }
       )
     }
   );
   
  }

}
