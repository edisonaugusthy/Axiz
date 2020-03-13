import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }

  showLoader() {
    this.spinner.show();
  }

  hideLoader() {
    this.spinner.hide();
  }

}
