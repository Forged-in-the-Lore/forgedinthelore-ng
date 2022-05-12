import {Component, OnInit, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {BusyService} from "../../_services/busy.service";

//Source: https://www.angularjswiki.com/angular/creating-progress-spinner-in-angular/

@Component({
  selector: 'app-mat-spinner-overlay',
  templateUrl: './mat-spinner-overlay.component.html',
  styleUrls: ['./mat-spinner-overlay.component.scss']
})
export class MatSpinnerOverlayComponent implements OnInit {

  constructor(private busyService: BusyService) {
    busyService.registerSpinner(this)
  }

  @Input() visible: boolean = false;
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: ProgressSpinnerMode = "indeterminate";
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: ThemePalette = "primary"

  ngOnInit() {

  }

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }
}
