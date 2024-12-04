import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-balance',
  imports: [
    CurrencyPipe,
    AsyncPipe
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
  constructor(private transactionService: TransactionService) {}

  get balance(): Observable<number> {
    return this.transactionService.getBalance();
  }
}
