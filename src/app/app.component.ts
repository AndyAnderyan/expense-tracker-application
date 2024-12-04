import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TransactionFormComponent} from './components/transaction-form/transaction-form.component';
import {TransactionListComponent} from './components/transaction-list/transaction-list.component';
import {BalanceComponent} from './components/balance/balance.component';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    TransactionFormComponent,
    TransactionListComponent,
    BalanceComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'Expense-Tracker-Application';
}
