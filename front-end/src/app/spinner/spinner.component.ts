import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../shared/services/interne/spinner.service';

const SPINNER_MESSAGE = 'Loading...';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() show: boolean;

  LOADING_TEXT: string;

  constructor(private spinner: NgxSpinnerService, private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.LOADING_TEXT = SPINNER_MESSAGE;
    this.spinnerService.getData().subscribe(data => {
      if (data) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
