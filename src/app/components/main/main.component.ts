import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faAngleDown,
  faCalendar,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @Output() showAlert = new EventEmitter<boolean>();

  data = JSON.parse(window.localStorage.getItem('LogoData')!) || undefined;

  //Icons
  faAngleDown = faAngleDown;
  faCircleExclamation = faCircleExclamation;
  faCalendar = faCalendar;
  locale = 'es';

  //Charts
  chart!: Chart;

  //Charts options
  dates!: any[];
  value: string = '';

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
  }

  ngOnInit(): void {
    //@ts-ignore
    this.chart = new Chart('nivel', {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Valor',
            },
          },
        },
      },
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Seleccione un rango de fechas y dato a mostrar',
            data: [],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(45, 224, 221, 0.2)',
            pointBackgroundColor: 'rgb(0,0,0)',
            pointHoverBackgroundColor: 'rgb(255, 255, 255)',
            pointHoverBorderColor: '#4bc0c0',
            pointHoverRadius: 7,
            tension: 0.1,
          },
        ],
      },
    });
    //If there's no localstorage then fetch database and save it
    if (!this.data) {
      this.getNewData();
    } else {
      //Fix for ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        //If there is localstorage then check if its expired
        if (this.data.expires < new Date().getTime()) {
          console.warn('Data Expired.');
          this.getNewData((data: any) => {
            console.info('New data saved.');
            data.isAlert
              ? this.showAlert.emit(true)
              : this.showAlert.emit(false);
          }); //If it then fetch new data and save it
        } else {
          //This checks whenever there is already localstorage and its not expired yet
          this.data.isAlert
            ? this.showAlert.emit(true)
            : this.showAlert.emit(false);
        }
      }, 250);
    }
  }

  loadData(event: any): void {
    //Fix small bug using timeout 0
    setTimeout(() => {
      if (this.dateFilter && this.value) {
        let [from, to] = this.dateFilter;
        console.log(this.data);
        let data = this.data.data.filter(
          //@ts-ignore
          (val) =>
            new Date(val.timestamp) >= from && new Date(val.timestamp) <= to
        );
        //@ts-ignore
        const values = data.map((x) => x[this.value]);
        //@ts-ignore
        const dates = data.map((x) =>
          this.datepipe.transform(x['timestamp'], 'dd/MM/YY')
        );
        this.chart.data.datasets[0].data = values;
        this.chart.data.datasets[0].label =
          this.value.charAt(0).toUpperCase() + this.value.slice(1);

        this.chart.data.labels = dates;

        //update chart
        this.chart.update();
      }

      return;
    }, 0);
  }

  getNewData(callback?: Function) {
    //Gets all the data from the database in aws
    this.dataBase.getSavedShadows().subscribe((data) => {
      //Creates a new maxdate for the datepicker and adds 1 day to it to avoid any errors
      this.maxDate = new Date(data[data.length - 1].timestamp);
      this.maxDate.setHours(this.maxDate.getHours() + 24);
      //New object to save to localstorage containing the expire timestamp
      let setExpiry = {
        data: data,
        isAlert:
          data[data.length - 1].nivel >= 149 &&
          data[data.length - 1].nivel <= 152,
        expires: new Date().getTime() + 60_000,
      };
      this.data = setExpiry;
      window.localStorage.setItem('LogoData', JSON.stringify(setExpiry));
      //If theres a callback passed to the function call it
      callback != undefined ? callback(setExpiry) : null;
    });
  }
}
