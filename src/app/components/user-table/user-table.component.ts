import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  @Input() users:Array<User> = []
  @Output() sendUser:EventEmitter<User> = new EventEmitter<User>();
  constructor() { }

  ngOnInit(): void {
  }

  activeUser(user:User){
    this.sendUser.emit(user);
  }


}
