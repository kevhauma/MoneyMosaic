import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CsvImportStepComponent, DateImportStepComponent, TransactionImportStepComponent } from '../../components/data-import';
import { FormStepperComponent, ImportStep } from '../../components/form-stepper/form-stepper.component';


@Component({
  selector: 'app-import-page',
  imports: [ReactiveFormsModule, CommonModule, FormStepperComponent],
  templateUrl: './import-page.component.html',
})
export class ImportPageComponent {
  private formBuilder = inject(FormBuilder);
  importStepIndex = signal(0)

  importForm = this.formBuilder.group({
    csv: this.formBuilder.group({
      files: ['', Validators.required],
      csvSeperator: ['', Validators.required],
      csvHeader: [''],
      csvObjects: ['', Validators.required],

    }),
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
    { label: "File Import", form: this.importForm.controls.csv, component: CsvImportStepComponent },
    { label: "Transaction", form: this.importForm.controls.numbers, component: TransactionImportStepComponent },
    { label: "Date", form: this.importForm.controls.date, component: DateImportStepComponent },
    { label: "Accounts", form: this.importForm.controls.accounts },
    { label: "Description", form: this.importForm.controls.descriptionField },
    { label: "Summary", form: this.importForm },
  ]
 
}

