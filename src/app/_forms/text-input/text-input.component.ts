import {Component, Input, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {FormControlService} from "../../_services/form-control.service";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = "Placeholder";
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl, public helper: FormControlService) {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
