import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerList: any;
  haveEdit = false;
  haveAdd = false;
  haveDelete = false;
  accessData: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
    this.setAccessPermission()
  }

  displayedColumns: string[] = ['code', 'name', 'creditLimit', 'actions'];
  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
  }

  loadCustomers() {
    this._auth.getAllCustomers().subscribe(res => {
      // this.userList = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // console.log(res);
    })
  }

  setAccessPermission() {
    this._auth.getAccessByUserRole(this._auth.getUserRole(), 'customer').subscribe(res => {
      this.accessData = res;
      // console.log(this.accessData);

      if (this.accessData.length > 0) {
        this.haveAdd = this.accessData[0].haveAdd;
        this.haveEdit = this.accessData[0].haveEdit;
        this.haveDelete = this.accessData[0].haveDelete;
        this.loadCustomers();
      } else {
        alert('You are not authorized to access');
        this._router.navigate([''])
      }

    })
  }

  updateCustomer(id: any) {
    if (this.haveEdit) {
      alert('Success!')
    } else {
      alert('You dont have an access for edit')
    }
  }

  deleteCustomer(id: any) {
    if (this.haveDelete) {
      alert('Success!')
    } else {
      alert('You dont have an access for delete')
    }
  }

  addCustomer() {
    if (this.haveAdd) {
      alert('Success!')
    } else {
      alert('You dont have an access for create')
    }
  }

}
