import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ContactModel } from './../../shared/models/contact.model';
import { CommonModule } from '@angular/common';
import { ContactApiService } from '../../shared/services/contact-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { PolicyModule } from '../../core/policy/policy.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [PolicyModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements AfterViewInit, OnInit {
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private _contactApiService: ContactApiService,
    private _dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'services', 'handle'];

  contacts: ContactModel[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    //this.contacts.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getContacts() {
    this._contactApiService.getItems()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.contacts = data;
      })
  }

  create() {
    this._dialog.open(CreateContactComponent, {
      width: '500px',
      disableClose: true
    })
      .afterClosed().subscribe(response => {
        console.log("Response: ", response);
      })
  }
}

