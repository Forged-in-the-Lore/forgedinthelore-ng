import { Injectable } from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
/**
 * Used to get around Typescript issues forms requiring form control while the form builder creates abstract control
 */
export class FormControlService {

  constructor() { }

  toControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }
}
