import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dynamic-validation',
  templateUrl: './dynamic-validation.component.html',
  styleUrls: ['./dynamic-validation.component.scss']
})
export class DynamicValidationComponent implements OnInit {
  demoForm: FormGroup;
  lpTypeList: any[] = [{name: 'Ward', value: 'WARD'}, {name: 'Service Holder', value: 'SERVICE-HOLDER'}];

  constructor(private fb: FormBuilder,
              private toastr: ToastrService) {
    this.demoForm = this.fb.group({
      input1: ['', Validators.required],
      input2: [''],
      select1: ['', Validators.required],
      select2: [''],
      lpTypeVal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.validateForm();
    if (this.demoForm.valid) {
      console.log(this.demoForm.value);
    }
  }

  validateForm() {
    if (!this.demoForm.valid) {
      // @ts-ignore
      const invalidControls = Object.keys(this.demoForm.controls).filter(controlName => this.demoForm.get(controlName).invalid);
      const firstInvalidControl = invalidControls[0];
      // const firstInvalidControlElement = this.demoForm.get(firstInvalidControl).value;
      // firstInvalidControlElement.focus();
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
      return this.toastr.warning(controlName + ' is required');
    } else if (elementSelect) {
      setTimeout(() => elementSelect.focus(), 0);
      return this.toastr.warning(controlName + ' is required');
    } else if (elementNgSelect) {
      setTimeout(() => elementNgSelect.focus(), 0);
      return this.toastr.warning(controlName + ' is required');
    }
  }

}
