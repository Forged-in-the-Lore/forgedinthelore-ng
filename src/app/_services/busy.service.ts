import {Injectable} from '@angular/core';
import {MatSpinnerOverlayComponent} from "../mat-spinner-overlay/mat-spinner-overlay/mat-spinner-overlay.component";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  spinner: MatSpinnerOverlayComponent = {} as MatSpinnerOverlayComponent

  constructor() {
  }

  busy() {
    this.busyRequestCount++;
    // if (this.spinner) this.spinner.show(undefined, {
    //   type: 'line-scale-party',
    //   bdColor: 'rgba(51,51,51,0.1)',
    //   color: '#fd7e14'
    // })

  }

  idle() {
    this.busyRequestCount--
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      // if (this.spinner) this.spinner.hide();
    }
  }

  registerSpinner(spinner: MatSpinnerOverlayComponent) {
    this.spinner = spinner;
  }
}
