import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FilterCategories} from '../../models/filter';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-transaction-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    MatGridTile,
    MatGridList,
    MatSlideToggle,
    NgIf
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent {
  fb: FormBuilder = inject(FormBuilder);
  transactionService: TransactionService = inject(TransactionService);

  categories = FilterCategories;

  transactionForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['income', Validators.required],
    category: [this.categories, Validators.required],
    date: [new Date(), Validators.required],
  });

  toggleTransactionType(event: any): void {
    const newType = event.checked ? 'income' : 'expense';
    this.transactionForm.get('type')?.setValue(newType);
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      this.transactionForm.reset({type: 'income', date: new Date()});
    }
  }
}
