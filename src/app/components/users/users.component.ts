import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:Array<User> = []
  constructor(private userServ:UserService) { 
    this.getUsers()
  }

  ngOnInit(): void {
  }

  getUsers(){
    this.userServ.getElements().get().then(
      snapshot => {
        snapshot.docs.map((element:any)=>{
          let user:User = new User();
          let data = element.data();
          user.id = element.id;
          user.fistName = data.fistName;
          user.lastName = data.lastName;
          user.age = data.age;
          user.dni = data.dni;
          user.email = data.email;
          user.password = data.password
          user.profile = data.profile;
          user.profileImgOne = data.profileImgOne;
          this.userServ.getProfilePhoto(user.profileImgOne).then(
            response=>{
              user.imageOne = response;
            }
          )
          if (user.profile == 'Paciente') {
            user.obraSocial = data.obraSocial;
            
            user.profileImgTwo = data.profileImgTwo;
            this.userServ.getProfilePhoto(user.profileImgTwo).then(
              response=>{
                user.imageTwo = response;
              }
            );
          }else {
            user.speciality = user.speciality;
          }

          ;

          this.users.push(user);
        })
      }
    )
  }

  handleUser(anUser:User){
    anUser.isActive = true;
    this.userServ.updateElement(anUser);
  }

}
