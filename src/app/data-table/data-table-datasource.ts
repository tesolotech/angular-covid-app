import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  id: number;
  quantity: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'Hydrogen',quantity:10},
  {id: 2, name: 'Helium',quantity:23},
  {id: 3, name: 'Lithium', quantity:10},
  {id: 4, name: 'Beryllium', quantity:10},
  {id: 5, name: 'Boron', quantity:10},
  {id: 6, name: 'Carbon', quantity:10},
  {id: 7, name: 'Nitrogen', quantity:10},
  {id: 8, name: 'Oxygen', quantity:10},
  {id: 9, name: 'Fluorine', quantity:10},
  {id: 10, name: 'Neon', quantity:10},
  {id: 11, name: 'Sodium', quantity:10},
  {id: 12, name: 'Magnesium', quantity:10},
  {id: 13, name: 'Aluminum', quantity:10},
  {id: 14, name: 'Silicon', quantity:10},
  {id: 15, name: 'Phosphorus', quantity:10},
  {id: 16, name: 'Sulfur', quantity:10},
  {id: 17, name: 'Chlorine', quantity:10},
  {id: 18, name: 'Argon', quantity:10},
  {id: 19, name: 'Potassium', quantity:10},
  {id: 20, name: 'Calcium', quantity:10},
  {id: 21, name: 'Neon', quantity:10},
  {id: 22, name: 'Sodium', quantity:10},
  {id: 23, name: 'Magnesium', quantity:10},
  {id: 24, name: 'Aluminum', quantity:10},
  {id: 25, name: 'Silicon', quantity:10},
  {id: 26, name: 'Phosphorus', quantity:10},
  {id: 27, name: 'Sulfur', quantity:10},
  {id: 28, name: 'Chlorine', quantity:10},
  {id: 29, name: 'Argon', quantity:10},
  {id: 30, name: 'Potassium', quantity:10},
  {id: 31, name: 'Calcium', quantity:10},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'quantity': return compare(+a.quantity, +b.quantity, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
