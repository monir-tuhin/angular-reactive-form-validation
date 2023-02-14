import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-dynamic-validation',
  templateUrl: './dynamic-validation.component.html',
  styleUrls: ['./dynamic-validation.component.scss']
})
export class DynamicValidationComponent implements OnInit {
  demoForm: FormGroup;
  lpTypeList: any[] = [{name: 'Ward', value: 'WARD'}, {name: 'Service Holder', value: 'SERVICE-HOLDER'}];
  genderList: any[] = [{name: 'Male', value: 'male'}, {name: 'Female', value: 'female'}];

  @ViewChild('lpType') lpType: NgSelectComponent;
  @ViewChild('gender') gender: NgSelectComponent;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService) {
    this.demoForm = this.fb.group({
      input1: ['', Validators.required],
      input2: [''],
      select1: ['', Validators.required],
      select2: [''],
      lpTypeVal: [null, Validators.required],
      gender: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.validateForm(this.demoForm);
    if (this.demoForm.valid) {
      console.log(this.demoForm.value);
    }
  }

  validateForm(form: FormGroup) {
    if (!form.valid) {
      // @ts-ignore
      const invalidControls = Object.keys(this.demoForm.controls).filter(controlName => this.demoForm.get(controlName).invalid);
      const firstInvalidControl = invalidControls[0];
      this.autofocus(firstInvalidControl);
    }
  }

  // @ts-ignore
  autofocus(controlName: string) {
    const elementInput = <any> document.querySelector('input[formControlName="' + controlName + '"]');
    const elementSelect = <any> document.querySelector('select[formControlName="' + controlName + '"]');
    const elementNgSelect = <any> document.querySelector('ng-select[formControlName="' + controlName + '"]');

    if (elementInput) {
      setTimeout(() => elementInput.focus(), 0);
      return this.toastr.warning(elementInput.ariaLabel + ' is required');
    } else if (elementSelect) {
      setTimeout(() => elementSelect.focus(), 0);
      return this.toastr.warning(elementSelect.ariaLabel + ' is required');
    } else if (elementNgSelect) {
      // this.onFocusNgSelect(elementNgSelect.id);
      this.onFocusNgSelect(elementNgSelect.id);
      return this.toastr.warning(elementNgSelect.ariaLabel + ' is required');
    }
  }

  onFocusNgSelect(elementId: string) {
    if (elementId == 'lpTypeId') { // static string need to make enum
      setTimeout(() =>  this.lpType.focus(), 0);
    } else if (elementId == 'genderId') { // static string need to make enum
      setTimeout(() =>  this.gender.focus(), 0);
    }
  }

}
