import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart = [];
  constructor(private covidService: Covid19Service) { }

  ngOnInit() {
      this.covidService.GetAllCovidData().subscribe((data) => {
        console.log(data);
        const ActiveCases = data['Countries'].map(res => res.NewConfirmed);
        const TotalConfirmed = data['Countries'].map(res => res.TotalConfirmed);
        const TotalDeaths = data['Countries'].map(res => res.TotalDeaths);
        const CountryName = data['Countries'].map(res => res.Country);
        // ActiveCases.splice(10, 160);
        // TotalConfirmed.splice(10, 160);
        // TotalDeaths.splice(10, 160);
        // CountryName.splice(10, 160);

        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
                labels: CountryName,
                datasets: [
                  {
                    data: ActiveCases,
                    borderColor: 'blue',
                    fill: true
                  },
                  {
                    data: TotalConfirmed,
                    borderColor: 'green',
                    fill: false
                  },
                  {
                    data: TotalDeaths,
                    borderColor: 'red',
                    fill: false
                  },
                ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        })


      });
    }
}
