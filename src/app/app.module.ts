import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableViewComponent } from './table-view/table-view.component';
import { Covid19Service } from './covid19.service';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    DataTableComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule
   ],
  providers: [Covid19Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
