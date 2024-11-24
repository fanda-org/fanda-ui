import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormContainer } from '../models';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'fui-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzCheckboxModule,
    NzSelectModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input({ required: true }) formContainer: FormContainer[] = [];
  @Input() class: string = '';
  @Input() isSubmit = true;
  @Input() checkBeforeSubmit = true;

  @Output('onSubmit') onSubmit = new EventEmitter<boolean | any>();

  protected formGroup: FormGroup = this.fb.group({});
  protected trackByFn(index: number, item: any): string {
    return item.formControlName || index;
  }

  get getValues() {
    return this.formGroup.value;
  }

  get isValid(): boolean {
    return this.formGroup.valid;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formContainer.forEach((f) => {
      f.formItems.forEach((form) => {
        const validators: any = this.getValidators(form.config);
        const control = new FormControl(form.value, validators);
        // control.valueChanges.subscribe((value) => (form.value = value));
        this.formGroup.addControl(form.formControlName, control);
      });
    });
  }

  protected getValidators(config: { [key: string]: any }): Validators[] {
    const validatorMapping: any = {
      min: (value: any) => Validators.min(value),
      max: (value: any) => Validators.max(value),
      required: (value: any) => (value ? Validators.required : null),
      email: (value: any) => (value ? Validators.email : null),
      minLength: (value: any) => Validators.minLength(value),
      maxLength: (value: any) => Validators.maxLength(value),
      pattern: (value: any) => Validators.pattern(value),
    };

    return Object.entries(config || {})
      .map(([key, value]) => validatorMapping[key]?.(value))
      .filter(Boolean);
  }

  protected getErrorMessage(error: any, label: string): string {
    const errorMessages: { [key: string]: string } = {
      required: `${label} is required`,
      email: `${label} is not valid`,
      minlength: `${label} must be at least ${error?.minlength?.requiredLength} characters long`,
      maxlength: `${label} must be at most ${error?.maxlength?.requiredLength} characters long`,
      min: `${label} must be at least ${error?.min?.min}`,
      max: `${label} must be at most ${error?.max?.max}`,
      pattern: `${label} is not valid`,
    };

    const errorKey = Object.keys(error || {}).find((key) => errorMessages[key]);
    return errorKey ? errorMessages[errorKey] : '';
  }

  submit() {
    // console.log('Form values: ', this.formGroup.value);
    if (this.checkBeforeSubmit && this.formGroup.invalid) {
      Object.values(this.formGroup.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      // console.log('Form: ', this.formGroup.errors);
      return false;
    }
    this.onSubmit.emit(this.formGroup.value);
    return this.formGroup.value;
  }
}
