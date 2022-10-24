import { Component, OnDestroy, OnInit } from '@angular/core';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { DatabaseService } from '../../service/database.service';
import { AuthenticationService } from '../../service/authentication.service';
import { expense_types } from '../../shared/constants/expense-constants';
import { Expense } from '../../shared/interfaces/expense-model'


@Component({
  selector: 'app-log-expense',
  templateUrl: './log-expense.component.html',
  styleUrls: ['./log-expense.component.scss']
})
export class LogExpenseComponent implements OnInit, OnDestroy {
  categories: string[] = this.loginService.getCurrentCategories();
  types: string[] = expense_types;
  expenseObj: Expense = {
    description: null,
    date: null,
    type: null,
    amount: null,
    userId: null
  };
  isLoading = false;
  dateError = false;

  constructor(private loginService: AuthenticationService,
              private database: DatabaseService) {
    database.categoriesAddedAnnounced$.subscribe(
      category => {
        this.updateExpenseCategories(category);
      });
  }

  ngOnInit() {
  }

  updateExpenseCategories(category: string) {
    this.categories = this.loginService.getCurrentCategories();
  }

  saveExpenseEntry(expenseForm: any) {
    this.isLoading = true;
    // if (typeof this.expenseObj.date !== 'string') {
      this.expenseObj.date = new Date();
      this.expenseObj.userId = Number(localStorage.getItem("currentUserId")); // 1234
    //}
    this.database.saveNewExpense(this.expenseObj, this.loginService.getUserId())
    .pipe(first())
            .subscribe(
                data => {
                  this.isLoading = false;
        expenseForm.resetForm();
        this.resetExpenseObj();
        this.showSnackBar();
        this.announceChange();
                },
                error => {
                  this.isLoading = false;
                  console.log('Failed');
                });
      
  }

  announceChange() {
    this.database.announceExpenseCreated('new expense');
  }

  resetExpenseObj() {
    this.expenseObj = {
      description: null,
      date: null,
      type: null,
      amount: null,
      userId: 0
    };
  }

  showSnackBar() {
    //this.snackBar.open('Expense saved!', '', {duration: 2000});
  }

  save(value: any, valid: any, form: any) {
    if (valid) {
      this.saveExpenseEntry(form);
    }
  }

  checkDate(date: Date) {
    this.dateError = (this.expenseObj.date == null);
  }

  clearForm(expenseForm: any) {
    this.dateError = false;
    expenseForm.resetForm();
    this.resetExpenseObj();
  }

  formatAmount() {
    if (this.expenseObj.amount !== null) {
      if (typeof this.expenseObj.amount !== 'string') {
        const rounded = this.expenseObj.amount.toFixed(2);
        this.expenseObj.amount = parseFloat(rounded);
      }
    }
  }

  ngOnDestroy(): void {
  }
}
