import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Type } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateImportStepComponent } from '../../components/import/date-import-step/date-import-step.component';
import { TransactionImportStepComponent } from '../../components/import/transaction-import-step/transaction-import-step.component';


export type ImportStep<T extends { [K in keyof T]: AbstractControl<any, any>; }> = {
  label: string;
  form: FormGroup<T> | FormControl<any>;
  component?: Type<{ form: FormGroup<T> | FormControl<any> }>;
}

@Component({
  selector: 'app-import-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './import-page.component.html',
})
export class ImportPageComponent {
  private formBuilder = inject(FormBuilder);
  importStepIndex = signal(0)

  importForm = this.formBuilder.group({
    numbers: this.formBuilder.group({
      amountField: ['', Validators.required],
      amountSeperator: ['', Validators.required],
      debitField: [''],
      debitSeperator: [''],
    }),
    date: this.formBuilder.group({
      dateField: ['', Validators.required],
      dateFormat: ['', Validators.required],
    }),
    accounts: this.formBuilder.group({
      accountField: ['', Validators.required],
      accountNameField: [''],
      recipientField: ['', Validators.required],
      recipientNameField: [''],
    }),
    descriptionField: ['', Validators.required],
  });
  importSteps: ImportStep<any>[] = [
    { label: "Transaction", form: this.importForm.controls.numbers, component: TransactionImportStepComponent },
    { label: "Date", form: this.importForm.controls.date, component: DateImportStepComponent },
    { label: "Accounts", form: this.importForm.controls.accounts },
    { label: "Description", form: this.importForm.controls.descriptionField },
    { label: "Summary", form: this.importForm },
  ]

  currentStep = computed(() => this.importSteps[this.importStepIndex()])

  setIndex(newIndex: number) {
    this.importStepIndex.set(newIndex)
  }

  submit() {
    if (this.currentStep().form.invalid) return

    this.importStepIndex.update(prev => ++prev)
  }
}

