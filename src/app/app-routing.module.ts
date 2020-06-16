import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {path: 'table-view', component: TableViewComponent},
  {path: 'data-table', component: DataTableComponent},
  {path: 'chart-view', component: ChartsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
