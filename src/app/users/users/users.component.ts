import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  showlist:boolean = true;
  constructor() {
  }
  ngOnInit(): void {
  }

  adduser()
  {
    this.showlist = !this.showlist;
  }
}
