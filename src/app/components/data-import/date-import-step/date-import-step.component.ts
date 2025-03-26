import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

type TransactionStepType = {
  dateField: AbstractControl<string>
  dateFormat: AbstractControl<string>
}

@Component({
  selector: 'app-date-import-step',
  imports: [],
  templateUrl: './date-import-step.component.html',
})
export class DateImportStepComponent {
  @Input() form!: FormGroup<TransactionStepType>;
}
