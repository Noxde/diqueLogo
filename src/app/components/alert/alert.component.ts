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
    calidad: 'Alerta calidad de agua afectada.',
    nivelSalida:
      'Alerta nivel salida por cota del dique a 158m.s.n.m, reservas utiles al 41%.',
    nivel1:
      'Alerta nivel 1 por cota del dique a 155m.s.n.m, suspension temporaria de todas las actividades recreativas en el embalse.',
    nivel2:
      'Alerta nivel 2 por cota del dique a 152m.s.n.m, prohibicion absoluta de todas las actividades recreativas en el embalse.',
    nivel3:
      'Alerta nivel 3 por cota del dique a 150m.s.n.m, prohibicion absoluta de todas las actividades recreativas en el embalse.',
  };

  constructor() {}

  ngOnInit(): void {}

  close() {
    this.closeAlert.emit(false);
  }
}
