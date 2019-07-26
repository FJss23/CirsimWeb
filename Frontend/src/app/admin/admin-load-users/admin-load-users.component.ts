import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';
import { DialogComponent } from '../dialog/dialog.component';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Status } from 'src/app/model/status';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-load-users',
  templateUrl: './admin-load-users.component.html',
  styleUrls: ['./admin-load-users.component.css']
})
export class AdminLoadUsersComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: ElementRef;
  csvContent: string;
  parsedCsv: string[][];
  errorMessage: string[];

  // csv properties
  usernamePos: number;
  passwordPos: number;
  namePos: number;
  surnamePos: number;
  rolPos:number;
  statusPos: number;
  totalParams: number;
  
  constructor(public dialog: MatDialog,
    private userApiService: UserApiService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.usernamePos = 0;
    this.passwordPos = 1;
    this.namePos = 2;
    this.surnamePos = 3;
    this.rolPos = 4;
    this.statusPos = 5;
    this.totalParams = 6;
    this.errorMessage = [];
  }


  /**
   * check if a file has been added and open a dialog
   */
  onSelectFile(event: any): void { 
    const files = event.target.files;
    if (files && files.length) {
      this.openDialog(files);
    }
  }

    /**
   * open a dialog to confirm the continuation of the loader process
   */
  openDialog(files: any): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '210px',
      data: {
        messageDialog: `La carga de usuarios elimina los usuarios existentes y las tareas
        activas, ¿está seguro de que desea continuar?`,
        titleDialog: `Carga de nuevos usuarios`,
      }
    });

    // If the user wants to continue, create the users
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'NEXT'){
        const fileToRead = files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.csvContent = fileReader.result.toString();
          this.errorMessage = [];
          this.onFileLoad();
        } 
        fileReader.readAsText(fileToRead, "UTF-8");
      }
      this.resetInput();
   })
  }

    /**
   * get the different sections of the csv
   */
  onFileLoad(): void {
    const csvSeparator = ';';
    const txt = this.csvContent;
    const csv = [];
    let lines = txt.split('\n');
    lines.forEach((element, index) => {
      let cols: string[] = element.split(csvSeparator);
      if(cols.length == 1){
        lines.splice(index, 1);
      } else {
        for(let i = 0; i < cols.length; i++){
          cols[i] = cols[i].trim();
          if(i == this.rolPos && cols[i] != Role.STUDENT && cols[i] != Role.TEACHER){
            this.errorMessage.push(`La línea ${index + 1} contiene un rol no permitido`);
           
          }
          if(i == this.statusPos && cols[i] != Status.ACTIVE && cols[i] != Status.INACTIVE){
            this.errorMessage.push(`La línea ${index + 1} contiene un estado no permitido`);
          }
        }
        if(cols.length < this.totalParams){
          this.errorMessage.push(`La línea ${index + 1} tiene menos parámetros de los requeridos`);
        }
        csv.push(cols);
      }
    });
    this.checkUserNames(csv);
    this.parsedCsv = csv;
    if(this.errorMessage.length == 0){
      this.createUserObject();
    }
  }

  /**
   * 
   * check for repeated user names
   */
  checkUserNames(csv: any[]) {
    let usernames = [];
    csv.forEach(cols => {
      usernames.push(cols[0]);
    });
    let unique = usernames.filter((elem, index, self) => 
      index === self.indexOf(elem));
    
    if(unique.length != usernames.length){
      this.errorMessage.push(`El fichero contiene nombres de usuario repetidos`);
    }
  }


  /**
   * restart the html input
   */
  resetInput(): void {
    this.myInputVariable.nativeElement.value = "";
  }


  createUserObject(): void {
    let users: User[] = [];
    this.parsedCsv.forEach((line) => {
      let username = line[this.usernamePos];
      let password = line[this.passwordPos];
      let name = line[this.namePos];
      let surname = line[this.surnamePos];
      let role = line[this.rolPos];
      let status = line[this.statusPos];

      users.push(new User(username, password, role).setName(name).setSurName(surname)
      .setStatus(status));
    });
    if(users.length > 0){
      this.deleteOldUsersAndCreateNews(users);
    }
  }


  /**
   * removes existing users and adds new ones that are passed as a parameter
   */
  deleteOldUsersAndCreateNews(users: User[]): void {
    this.userApiService.deleteAllUsers().subscribe(
      () => {
        this.userApiService.addUsers(users). subscribe(
          () => {
            this.userService.setSuccessMessage('Usuarios añadidos correctamente');
            this.router.navigateByUrl('admin');
          }
        );
    });
  }
}
