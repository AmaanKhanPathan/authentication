import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _fb : FormBuilder,
    private _auth : AuthService,
    private _router : Router
    ) { }

  registerForm = this._fb.group({
    id : this._fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name : this._fb.control('', Validators.required),
    password : this._fb.control('', Validators.compose([Validators.required, 
      // Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")
    ])),
    email : this._fb.control('', Validators.compose([Validators.required, Validators.email])),
    gender : this._fb.control('male'),
    role : this._fb.control(''),
    isActive : this._fb.control(false)
  })

  proceedToRegistration(){
    if(this.registerForm.valid){
      this._auth.proceedRegister(this.registerForm.value).subscribe(res=>{
        alert('Please contact admin for enable service, Register Successfully');
        this._router.navigate(['/login'])
      })
    }else{
      alert('Please enter valid value')
    }
  }

  ngOnInit(): void {
  }

}
