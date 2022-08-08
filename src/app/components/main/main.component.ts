import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faAngleDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  //Icons
  faAngleDown = faAngleDown;
  faCalendar = faCalendar;

  //Charts
  nivel!: Chart;

  //Charts options
  locale = 'es';
  dates!: any[];
  values = ['nivel', 'caudal', 'oxigeno'];
  value: string = '';
  fill = false;
  tension = 0.1;

  //Dates
  minDate!: Date;
  dateFilter!: Date[];
  maxDate!: Date;

  constructor(
    private localeService: BsLocaleService,
    private dataBase: AwsService,
    private datepipe: DatePipe
  ) {
    this.localeService.use(this.locale);
    this.minDate = new Date('2022-1-1');
    this.maxDate = new Date('2022-7-31');
  }

  ngOnInit(): void {
    //@ts-ignore
    this.nivel = new Chart('nivel', {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      data: {
        labels: this.dates,
        datasets: [
          {
            label: '',
            data: [],
            fill: this.fill,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(45, 224, 221)',
            pointBackgroundColor: 'rgb(0,0,0)',
            tension: this.tension,
          },
        ],
      },
    });
  }

  loadData(event: any): void {
    setTimeout(() => {
      if (this.dateFilter && this.value) {
        let [from, to] = this.dateFilter;

        this.dataBase.getFromDates(from, to).subscribe((data) => {
          //@ts-ignore
          const values = data.map((x) => x[this.value]);
          //@ts-ignore
          const dates = data.map((x) =>
            this.datepipe.transform(x['timestamp'], 'dd/MM/YY')
          );
          this.nivel.data.datasets[0].data = values;
          this.nivel.data.datasets[0].label =
            this.value.charAt(0).toUpperCase() + this.value.slice(1);

          this.nivel.data.labels = dates;

          this.fill = true;
          //update charts
          this.nivel.update();
        });
      }
      return;
    }, 0);
  }
}
