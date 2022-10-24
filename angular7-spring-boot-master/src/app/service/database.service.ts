import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Expense } from '../shared/interfaces/expense-model'
import { ExpenseImportModel } from '../home/expense-import/expense-import.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  private expenseAddedSource = new Subject<string>();
  private categoriesAddedSource = new Subject<string>();

  expenseAddedAnnounced$ = this.expenseAddedSource.asObservable();
  categoriesAddedAnnounced$ = this.categoriesAddedSource.asObservable();


  constructor(private http: HttpClient) {
  }

  announceExpenseCreated(message: string) {
    this.expenseAddedSource.next(message);
  }

  announceCategoriesAdded(message: string) {
    this.categoriesAddedSource.next(message);
  }

   saveNewExpense(expense: Expense | ExpenseImportModel, userId: string) {
    return this.http.post('http://localhost:8080/api/v1/expenses/register', expense);
   }

  getUserExpenses() {
   
    return this.http.get<any>('http://localhost:8080/api/v1/expenses/' + localStorage.getItem('currentUserId'))
            .pipe(map(data => 
                {

                    //data1 = data;
                   
                    if(data[0] != null) {
                        localStorage.setItem('currentUser', JSON.stringify(data[0]));
                        //this.currentUserSubject.next(data[0]);
                        return data;
                    }
                    else {

                    }
                
            }));
   }

  // saveNewCategories(categories: string[], userId: string): Promise<any> {
  //   return this.db.database.ref('users/' + userId + '/categories').set(
  //     categories
  //   );
  // }

  // getUserDetails(currentUser: string): Promise<firebase.database.DataSnapshot> {
  //   return this.db.database.ref('users/').orderByChild('email').equalTo(currentUser).once('value');
  // }

  // getCurrentCategories(userId: string): Promise<firebase.database.DataSnapshot> {
  //   return this.db.database.ref('users/' + userId + '/categories').once('value');
  // }

  // getExpensesOnce(userId: string): Promise<firebase.database.DataSnapshot> {
  //   return this.db.database.ref('users/' + userId + '/expenses').once('value');
  // }

  // updateExpense(userId: string, key: string, expense: Expense): Promise<void> {
  //   return this.db.list('users/' + userId + '/expenses').update(key, expense);
  // }

  // deleteExpense(userId: string, key: string): Promise<void> {
  //   return this.db.list('users/' + userId + '/expenses').remove(key);
  // }
}
