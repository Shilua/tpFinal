import { Component, OnInit, OnChanges } from '@angular/core';
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
    public authServ :AuthService,
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
  goToAdmin(){
    this.router.navigate(['/users'])
  }

  ngOnInit(): void {
   
  }
  ngOnChanges(): void {
    this.user = this.authServ.anUser;
  }

}
