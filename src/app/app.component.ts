import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('alertAnim', [
      transition(':enter', [
        style({
          height: 0,
          'padding-bottom': 0,
          'padding-top': 0,
        }),
        animate(
          '250ms ease-out',
          style({ height: '*', 'padding-bottom': '*', 'padding-top': '*' })
        ),
      ]),
      transition(':leave', [
        style({ height: '*', padding: '*' }),
        animate(
          '600ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ height: 0, 'padding-bottom': 0, 'padding-top': 0 })
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'diqueLogo';

  alerta = false;

  testAlertas = [];

  constructor() {}

  closeAlert(event: any) {
    this.alerta = false;
  }

  handler(event: any) {
    this.testAlertas = event;
    this.alerta = true;
  }

  ngOnInit() {}
}
