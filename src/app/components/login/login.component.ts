import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    sessionStorage.clear()
   }

  loginForm = this._fb.group({
    username: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required)
  })

  ngOnInit(): void {
  }

  proceedToLogin() {
    if (this.loginForm.valid) {
      this._auth.getByCode(this.loginForm.value.username).subscribe(res => {
        this.userData = res;
        console.log(this.userData);
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            sessionStorage.setItem('username', this.userData.id);
            sessionStorage.setItem('userRole', this.userData.role);
            this._router.navigate([''])
          } else {
            alert('Inactive user please contact admin')
          }
        } else {
          alert('Invalid Credentials')
        }
      })
    }
  }

}
