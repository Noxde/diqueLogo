import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Output() closeAlert = new EventEmitter<boolean>();

  faCircleExclamation = faCircleExclamation;
  faXmark = faXmark;

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeAlert.emit(false);
  }
}
