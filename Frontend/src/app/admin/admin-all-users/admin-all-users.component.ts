import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserApiService } from 'src/app/services/api/user-api.service';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  users: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserApiService) { }

  ngOnInit() {
    this.getUsers();
    this.displayedColumns = ['username','name', 'lastName', 'role', 'status','actions'];
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users.body;
        console.log(this.users);
        this.dataSource.data = this.users;
      }
    );
  }

}
