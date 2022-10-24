import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Expense } from '../../../shared/interfaces/expense-model';
import { ManageExpenseComponent } from '../../manage-expense/manage-expense.component';
import { DatabaseService } from '../../../service/database.service';
import { AuthenticationService } from '../../../service/authentication.service';
import { first } from 'rxjs/operators';


const ELEMENT_DATA: Expense[] = [
  {
    id : '1', description : 'mmsmmds', date: "1899/08/19",  type : 'djd',  amount : '45', userId: 7
  }
];

@Component({
  selector: 'app-table-summary',
  templateUrl: 'table-summary.component.html',
  styleUrls: ['table-summary.component.scss']
})
export class TableSummaryComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sorter', {static: true}) sort: MatSort;
  @Input() data: Expense[] = [];
  @Input() displayColumns: string[] = ["description", "amount", "type"];
  displayedColumns: string[] = ['id',  'description', 'date',  'type',  'amount', 'userId'];

  expensesData = new MatTableDataSource<Expense>();
  metrics: {
    color?: string, value: string | number, metricTitle: string, icon?: string
  }[] = [];

  displayData = false;

  constructor(public dialog: MatDialog, private database: DatabaseService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    
    this.getUserExpenses();
 
    this.expensesData.paginator = this.paginator;
    this.expensesData.sort = this.sort;
   // this.expensesData = new MatTableDataSource<Expense>(this.data);
    console.log("this.expensesData " + this.expensesData.data)
   
  }

    getUserExpenses() {
      //const currentUser: string = this.loginService.getUser() ? this.loginService.getUser().email : null;
      // if (currentUser) {
        this.database.getUserExpenses()
        .subscribe((res)=>{
          //console.log(res);
          this.expensesData = new MatTableDataSource(res);
          //this.expensesData.data = ELEMENT_DATA;
          this.displayData = true;
        })
     // }
    }
  
  //   checkDate(e: Date, prop: string) {
  //     this[prop] = e;
  //   }
  
  //   // getUserCategories() {
  //   //   this.database.getCurrentCategories(this.loginService.getUserId())
  //   //     .then(jsonData => {
  //   //       const obj = jsonData.toJSON();
  //   //       const categoriesArr = Object.keys(obj).map((key) => obj[key]);
  //   //       this.loginService.setCategories(categoriesArr);
  //   //     }).catch(e => {
  //   //   })
  //   // }
  
  //   private subToExpensesChange() {
  //     const userId = this.authenticationService.getUserId();
  //     //this.isLoadingExpenses = true;
  //     if (userId) {
  //       // this.expensesData = this.database.getUserExpenses(Number(userId))
  //       //   .subscribe(snapshots => this.filterData(snapshots));
  //     } else {
  //       //this.isLoadingExpenses = false;
  //     }
  //   }
  
  //   parseData(snapsShots: any) {
  //     const data = [];
  //     snapsShots.forEach(snapshot => {
  //       const expense = snapshot.payload.exportVal();
  //       expense.id = snapshot.key;
  //       data.push(expense);
  //     });
  //     return data;
  //   }
  
  //   filterData(snapshots) {
  //    // this.isLoadingExpenses = false;
  //     const parsedData = this.parseData(snapshots);
  
  
  //     const firstDate = new Date(Math.min.apply(null, parsedData.map((e) => new Date(e.date))));
  //     const lastDate = new Date(Math.max.apply(null, parsedData.map((e) => new Date(e.date))));
  //     const numOfEntries = parsedData.length;
  //     const totalAmount = this.getTotal(parsedData);
  
  
  //     this.metrics = [
  //       {color: null, value: firstDate.toDateString().slice(3, 15), metricTitle: 'First Expense Date', icon: 'today'},
  //       {color: null, value: lastDate.toDateString().slice(3, 15), metricTitle: 'Latest Expense Date', icon: 'today'},
  //       {color: null, value: numOfEntries, metricTitle: 'Number of Expenses', icon: 'receipt'},
  //       {color: 'money-icon', value: totalAmount, metricTitle: 'Total Amount', icon: 'attach_money'},
  //     ];
  
  //     // this.categories = parsedData
  //     //   .map(item => item.category)
  //     //   .filter((value, index, self) => self.indexOf(value) === index);
  
  //     const pieData = [];
  
  //     // for (const category of this.categories) {
  //     //   let categorySum = 0;
  //     //   for (const value of parsedData) {
  //     //     if (value.category === category) {
  //     //       categorySum += value.amount;
  //     //     }
  //     //   }
  //     //   const dataObj = {name: category, y: categorySum, value: categorySum.toFixed(2)};
  //     //   pieData.push(dataObj);
  //     // }
  //     // this.expenseDataChart = pieData;
  //     // this.expenseDataTable = parsedData;
  
  //     // this.isDataReady = true;
  //     // this.isLoadingExpenses = false;
  //   }
  
  //   getTotal(expenses: any): string {
  //     let categorySum = 0;
  //     for (const expense of expenses) {
  //       categorySum += expense.amount;
  //     }
  //     return categorySum.toFixed(2);
  //   }
  
  //   getCategoryTotals(expenses: Expense[]) {
  //     // const categories = expenses
  //     //   .map(item => item.category)
  //     //   .filter((value, index, self) => self.indexOf(value) === index);
  //     const totals = [];
  
  //     // for (const category of categories) {
  //     //   let categorySum = 0;
  //     //   for (const value of expenses) {
  //     //     // if (value.category === category) {
  //     //     //   categorySum += value.amount as number;
  //     //     // }
  //     //   }
  //     //   const dataObj = {name: category, amount: categorySum.toFixed(2)};
  //     //   totals.push(dataObj);
  //     // }
  //     return totals.toString();
  //   }
  
  //   ngOnDestroy() {
  //     if (this.expensesData) {
  //     //  this.expensesData.unsubscribe();
  //     }
  //   }

   ngAfterViewInit() {
     //this.expensesData.sort = this.sort;
   }

   ngOnChanges(changes: any) {
    //  if (!changes.data.firstChange) {
    //    this.expensesData = new MatTableDataSource<Expense>(this.data);
    //    this.expensesData.paginator = this.paginator;
    //    this.expensesData.sort = this.sort;
    //  }
   }

  // isDataEmpty(): boolean {
  //   return this.data.length === 0;
  // }

  // editData(expense: Expense) {
  //   const dialogRef = this.dialog.open(ManageExpenseComponent, {
  //     data: expense as any,
  //     hasBackdrop: true,
  //     disableClose: true,
  //   });
  // }
}
