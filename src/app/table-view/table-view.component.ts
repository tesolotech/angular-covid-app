import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';


@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  public CovidDataSets;
  public tableHeader = [];
  constructor(private covidService: Covid19Service) { }

  ngOnInit() {
    this.GetCovidDataSets();
  }

  GetCovidDataSets() {
    this.covidService.GetAllCovidData().subscribe((data) => {
      this.CovidDataSets = data;
      this.tableHeader = Object.keys(this.CovidDataSets.Countries[0]);
    });
  }

}
