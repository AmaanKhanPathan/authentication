import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'CRUD_practice';
  isMenuRequired = false;
  isAdminuser = false;

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngDoCheck(): void {
    let currentUrl = this._router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if (this._auth.getUserRole() === 'admin') {
      this.isAdminuser = true;
    } else {
      this.isAdminuser = false;
    }
  }
}
