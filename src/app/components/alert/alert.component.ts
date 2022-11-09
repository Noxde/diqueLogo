import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { alertas as alertasInt } from './alertas';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Output() closeAlert = new EventEmitter<boolean>();
  @Input() alertas!: string[];

  faCircleExclamation = faCircleExclamation;
  faXmark = faXmark;

  alertasTexto: alertasInt = {
    calidad: '(WIP)Alerta calidad de agua afectada.',
    nivelSalida:
      '(WIP)Alerta nivel salida por cota del dique a 158m.s.n.m, se recomienda suspender todas las actividades recreativas en el embalse.',
    nivel1:
      '(WIP)Alerta nivel 1 por cota del dique a 155m.s.n.m, se recomienda suspender todas las actividades recreativas en el embalse.',
    nivel2:
      '(WIP)Alerta nivel 2 por cota del dique a 152m.s.n.m, se recomienda suspender todas las actividades recreativas en el embalse.',
    nivel3:
      '(WIP)Alerta nivel 3 por cota del dique a 150m.s.n.m, se recomienda suspender todas las actividades recreativas en el embalse.',
  };

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeAlert.emit(false);
  }
}
