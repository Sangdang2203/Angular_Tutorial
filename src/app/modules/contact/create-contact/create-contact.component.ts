import { Component, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ContactApiService } from '../../../shared/services/contact-api.service';
import { GlobalService } from '../../../core/services/global.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MESSAGE_TYPE } from '../../../core/models/message.model';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.scss',
  imports: [MatDialogModule, MatButtonModule, ContactFormComponent]
})
export class CreateContactComponent {
  @ViewChild(ContactFormComponent) contactForm: ContactFormComponent
  constructor(
    private _dialogRef: MatDialogRef<ContactFormComponent>,
    private _contactApiService: ContactApiService,
    private _globalService: GlobalService
  ) { }

  submit() {
    const form = this.contactForm.form;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const data = form.getRawValue();

    this._contactApiService.create(data)
      .subscribe({
        next: (val) => {
          this._globalService.message.next({
            type: MESSAGE_TYPE.success,
            message: 'Adding new contact successfully.',
          });
          this._dialogRef.close(val);
        },

        complete: () => {

        },

        error: (err) => {
          this._globalService.message.next({
            type: MESSAGE_TYPE.error,
            message: 'Error! Failed to add new contact.',
          });
        }
      })
  }

}
