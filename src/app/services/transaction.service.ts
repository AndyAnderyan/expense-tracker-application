import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Filter} from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private storageKey = 'transactions';

  private filtersSubject = new BehaviorSubject<Filter>({ type: undefined, category: undefined }); // Суб'єкт для фільтрів
  private transactionsSubject = new BehaviorSubject(this.loadTransactions())

  public transactions$ = this.transactionsSubject.asObservable();
  filteredTransactions$: Observable<Transaction[]> = combineLatest([
      this.transactions$,
      this.filtersSubject.asObservable()
    ]).pipe(
      map(([transactions, filters]) => {
        return transactions.filter(transaction => {
          const matchesType = !filters.type || transaction.type === filters.type;
          const matchesCategory = !filters.category || transaction.category === filters.category;
          return matchesType && matchesCategory;
        });
      })
    );


  private loadTransactions(): Transaction[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addTransaction(transaction: Transaction) {
    const currentTransactions = this.loadTransactions()
    transaction.id = Date.now();
    currentTransactions.push(transaction);
    localStorage.setItem(this.storageKey, JSON.stringify(currentTransactions));
    this.transactionsSubject.next(currentTransactions);
  }

  getBalance(): Observable<number> {
    return this.transactions$.pipe(
      map(transactions => transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0))
    );
  }

  applyFilters(filter: Filter) {
    this.filtersSubject.next(filter);
  }
}
