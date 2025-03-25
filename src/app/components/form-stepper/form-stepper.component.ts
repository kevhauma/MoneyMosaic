import { CommonModule } from '@angular/common';
import { Component, computed, input, model, Type } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CheckmarkIconComponent } from '../icons/checkmark-icon/checkmark-icon.component';

export type ImportStep<T extends { [K in keyof T]: AbstractControl<any, any>; }> = {
  label: string;
  form: FormGroup<T> | FormControl<any>;
  component?: Type<{ form: FormGroup<T> | FormControl<any> }>;
}

@Component({
  selector: 'app-form-stepper',
  imports: [CheckmarkIconComponent, CommonModule],
  templateUrl: './form-stepper.component.html',
 
})
export class FormStepperComponent {
  stepIndex = model(0)
  steps = input<ImportStep<any>[]>([])
  currentStep = computed(() => this.steps()[this.stepIndex()])

  isStepDisabled(index: number) {
    const step = this.steps()[index]
    if (!step) return true;
    //enable when it's the current step
    if (this.stepIndex() === index) return false;
    //enable when the step is valid
    if (step.form.valid) return false;
    //if current step is valid, enable next step
    const nextStepWithValidCurrent = this.currentStep().form.valid && index === this.stepIndex() + 1
    if (nextStepWithValidCurrent)
      return false
    //else disable step
    return true
  }

  setIndex(newIndex: number) {
    this.stepIndex.set(newIndex)
  }

  next() {
    if (this.currentStep().form.invalid) return

    this.stepIndex.update(prev => ++prev)
  }
}
