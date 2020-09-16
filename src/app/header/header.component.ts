import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {decoratorArgument} from "codelyzer/util/astQuery";
import {User} from "../_model/Interfaces";
import {Subscription} from "rxjs";
import {ControllerService} from "../_service/controller.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy  {

  constructor(private dialog: MatDialog,
              private controllerService: ControllerService) { }

  user: User = {} as User;
  subscription: Subscription;

  ngOnInit(): void {
    this.openDialog()
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    const dialogRef = this.dialog.open(AuthDialogComponent, dialogConfig);

    this.subscription = dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.user = data;
        this.controllerService.studentAuthorization(data).subscribe( (data:User) => {
          console.log(data);
          sessionStorage.setItem("id", `${data.student_id}`);
        })
      }
    );
  }

  ngOnDestroy() {
    console.log("DESTROY");
    this.subscription.unsubscribe();
    sessionStorage.removeItem("id");
  }


}


