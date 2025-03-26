import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

type TransactionStepType = {
  amountField: AbstractControl<string>
  amountSeperator: AbstractControl<string>
  debitField: AbstractControl<string | undefined>;
  debitSeperator: AbstractControl<string | undefined>
}

@Component({
  selector: 'app-transaction-import-step',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-import-step.component.html',
})
export class TransactionImportStepComponent {
  @Input() form!: FormGroup<TransactionStepType>;
}
