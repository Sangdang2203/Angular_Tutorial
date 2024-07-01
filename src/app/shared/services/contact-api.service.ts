
import { Observable, map, of } from "rxjs";
import { ApiService } from "../../core/services/api.service";
import { ContactModel } from "../models/contact.model";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  static CONTACT = 'contacts';

  static url = `${environment.apiHost}/${environment.apiPrefix}/contacts`;

  constructor(private _apiService: ApiService) { }

  getItems(): Observable<ContactModel[]> {
    // return this._apiService.get(ContactApiService.CONTACT)
    //   .pipe(map(array => array.map((value: any) => ContactModel.fromJson(value))));
    const mockData = [
      { id: "1", name: 'Coca', phone: "0909751772", email: "sang@gmail.com", services: ['aaaa', 'bbbb'], message: "" },
      { id: "2", name: 'Pepsi', phone: "0909751772", email: "sang@gmail.com", services: ['aaaa', 'bbbb'], message: "" },
      { id: "3", name: 'Red Bull', phone: "0909751772", email: "sang@gmail.com", services: ['aaaa', 'bbbb'], message: "" },
    ];
    return of(mockData).pipe(map(arr => arr.map(val => ContactModel.fromJson(val))));
  }

  getDetail(data: { id: string }): Observable<ContactModel> {
    return this._apiService.get('contacts/:id', data)
      .pipe(map(value => ContactModel.fromJson(value)));
  }

  create(data: any) {
    return this._apiService.post(ContactApiService.url, data)
  }
}