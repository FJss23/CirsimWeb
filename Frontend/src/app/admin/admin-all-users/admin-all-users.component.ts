import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatPaginator, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { Status } from 'src/app/model/status';
import { DialogComponent } from '../dialog/dialog.component';
import { Role } from 'src/app/model/role';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[];
  dataSource: any;
  users: User[];

  constructor(private userService: UserApiService) { }

  ngOnInit() {
    this.getUsers();
    this.displayedColumns = ['username','name', 'surname', 'role', 'status','actions'];
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.dataSource.paginator = this.paginator;
  }

  asignUsersAndSort(users: any): void {
    this.users = users.body;
    this.sortByUserName(this.users);
    this.dataSource.data = this.users;
  }

  sortByUserName(users: User[]) {
    users.sort((a, b) => {
      return (a.username < b.username ? -1 : 1);
    });
  }

  /**
   * get a list of users and order them
   */
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users: any) => {
        this.asignUsersAndSort(users);
      }
    );
  }

  /**
   * changes the state of the user that is passed as a parameter
   */
  changeStatus(user: User): void {
    let newStatus = (`STATUS_${user.status}` == Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE);
    this.userService.partialUpdateUser({status: newStatus}, user.id).subscribe(
      () => this.getUsers()
    );
  }

  /**
   * Remove all users
   */
  deleteAllUser(): void {
    this.userService.deleteAllUsers().subscribe(
      () => console.log(`All users deleted`)
    );
  }

  createUser(): void {

  }

  editUser(user: User): void {

  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe(
      () => this.getUsers()
    );
  }
}
