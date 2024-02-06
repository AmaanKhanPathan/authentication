import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _auth: AuthService,
    private _dialog : MatDialog) { }
  userList: any;

  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this._auth.getAll().subscribe(res => {
      // this.userList = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res);
    })
  }

  updateUser(code:any){
    const popup = this._dialog.open(UpdateComponent, {
      enterAnimationDuration : '1000ms',
      exitAnimationDuration : '500ms',
      width : '50%',
      data : {
        userCode : code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadUsers()
    })
  }

}
