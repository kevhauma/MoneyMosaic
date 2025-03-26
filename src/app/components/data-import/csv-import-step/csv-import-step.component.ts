import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

type CsvStepType = {
  files: AbstractControl<string[]>
  csvSeperator: AbstractControl<string>
  csvHeader: AbstractControl<boolean | undefined>;
  csvObjects: AbstractControl<object[] | undefined>
}

@Component({
  selector: 'app-csv-import-step',
  imports: [ReactiveFormsModule],
  templateUrl: './csv-import-step.component.html',
})
export class CsvImportStepComponent {
  @Input() form!: FormGroup<CsvStepType>;
}



