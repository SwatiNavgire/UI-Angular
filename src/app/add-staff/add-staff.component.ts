import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { StaffModel } from './add-staff.model';
import { NgModule } from '@angular/core';

@Component({

  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})

export class AddStaffComponent implements OnInit {

  formValue: FormGroup
  staffModelObj: StaffModel = new StaffModel();
  staffData !: any;
  //isShownAdd: boolean = false ;
 // isShownUpdate: boolean = false ;
  //ormbuilder !: any;  
  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private route: Router) {

    this.formValue = this.formbuilder.group({
      staffEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      staffNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      //staffId: ['',[Validators.required]],
      staffName: ['', [Validators.required, Validators.max(15)]]
    });
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.formValue.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  ngOnInit(): void {

    /*  this.formValue = this.formbuilder.group({
       staffId: [''],
       staffName: [''],
       staffNumber: [''],
       staffEmail: ['']
     }) */
    this.getAllStaff();
  }
  get f() {

    return this.formValue.controls;

  }
  submit() {
    if (this.formValue.invalid) {
      return;
    }

    console.log(this.formValue.value);

  }
  postStaffDetails() {
    // this.staffModelObj.staffId = this.formValue.value.staffId;
    this.staffModelObj.staffName = this.formValue.value.staffName;
    this.staffModelObj.staffNumber = this.formValue.value.staffNumber;
    this.staffModelObj.staffEmail = this.formValue.value.staffEmail;

//     if (this.formValue.invalid) {​​​
// return;
//     }​​​

    if (this.staffModelObj.staffName.length <= 20) {
      
      this.api.postStaff(this.staffModelObj)
        .subscribe(data => {
          for (const [key, value] of Object.entries(data)) {
            alert(value)
          }
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
        },

          error => {
            alert("Something Went Wrong")
          })
     } else {
       alert("Name should not be more then 20 letter.")
     }

    this.getAllStaff();
    this.route.navigate(['localhost:4200']);
  }

  getAllStaff() {
    this.api.getStaff("swati")
      .subscribe(res => {
        this.staffData = res;
      })
  }



  deleteStaff(row: any) {
    console.log(row.staffId);
    this.api.deleteStaff(row.staffId, row)
      .subscribe(res => {
        alert("Deleted Successfully.")
       alert(res);
      })
    this.getAllStaff();
  }



  onEdit(row: any) {
    this.staffModelObj.staffId = row.staffId;
   // this.formValue.controls['staffId'].setValue(row.staffId);
    this.formValue.controls['staffName'].setValue(row.staffName);
    this.formValue.controls['staffNumber'].setValue(row.staffNumber);
    this.formValue.controls['staffEmail'].setValue(row.staffEmail);
  }

  updateStaffDetails() {
    this.staffModelObj.staffName = this.formValue.value.staffName;
    this.staffModelObj.staffNumber = this.formValue.value.staffNumber;
    this.staffModelObj.staffEmail = this.formValue.value.staffEmail;
    //this.isShown = ! this.isShown;
    

    this.api.updateStaff(this.staffModelObj)
      .subscribe(data => {
        alert("Updated Successfully.")
         //for (const [key, value] of Object.entries(data)) {
         //alert(value)
        //}
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
      },
        error => {
          alert("Something Went Wrong")
        })
    this.getAllStaff();
  }
}
