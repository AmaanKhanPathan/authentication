import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { log } from 'mathjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  roleList : any;
  editData : any;

  constructor(
    private _fb : FormBuilder,
    private _auth : AuthService,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private _dialog : MatDialogRef<UpdateComponent>) { }

  updateForm = this._fb.group({
    id : this._fb.control(''),
    name : this._fb.control(''),
    password : this._fb.control(''),
    email : this._fb.control(''),
    gender : this._fb.control('male'),
    role : this._fb.control('', Validators.required),
    isActive : this._fb.control(false)
  })

  ngOnInit(): void {
    this._auth.getAllRole().subscribe(res=>{
      console.log(res);
      this.roleList = res;

      if(this.data.userCode != null && this.data.userCode != ''){
        this._auth.getByCode(this.data.userCode).subscribe(res => {
          this.editData = res;
          this.updateForm.setValue(
            { 
              id:this.editData.id, 
              name : this.editData.name, 
              email : this.editData.email, 
              password : this.editData.password, 
              role : this.editData.role, 
              gender : this.editData.gender, 
              isActive : this.editData.isActive
            }
            )
        })
      }
      
    })
  }

  proceedToUpdate(){
    if(this.updateForm.valid){
      this._auth.updateUser(this.updateForm.value.id, this.updateForm.value).subscribe(res => {
        alert('Updated Successfully !');
        this._dialog.close();
      })
    }else{
      alert('Please Select Role')
    }
  }

}
