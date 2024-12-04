import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Transaction} from '../../models/transaction';
import {FilterCategories, FilterCategory, FilterType, FilterTypes} from '../../models/filter';

@Component({
  imports: [
    MatSortModule,
    MatSelect,
    FormsModule,
    MatFormField,
    MatOption,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    CurrencyPipe,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NgForOf
  ],
  selector: 'app-transaction-list',
  styleUrl: './transaction-list.component.css',
  templateUrl: './transaction-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements OnInit{
  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  private transactionService: TransactionService = inject(TransactionService)
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>;

  filterType: FilterType | undefined = undefined;
  types: FilterType[] = FilterTypes;
  filterCategory: FilterCategory | undefined = undefined;
  categories: FilterCategory[] = FilterCategories;
  columnsDef: string[] = ['name', 'amount', 'type', 'category', 'date']

  @ViewChild(MatSort) matSort!: MatSort;

  ngOnInit() {
    this.transactionService.filteredTransactions$.subscribe((transactions: Transaction[]) => {
      this.dataSource = new MatTableDataSource<Transaction>(transactions);
      this.cdRef.markForCheck();
    })
  }

  applyFilters() {
    this.transactionService.applyFilters({ type: this.filterType, category: this.filterCategory });
  }

  clearFilters() {
    this.filterType = undefined;
    this.filterCategory = undefined;
    this.applyFilters();
  }

  applySort() {
    this.dataSource.sort = this.matSort;
  }
}
