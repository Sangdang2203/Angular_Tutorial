import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ApiService } from '../../core/services/api.service';
import { AppConstant } from '../../app.constant';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    static LOGIN = 'auth';
    static USER_PROFILE = 'auth';

    constructor(private apiService: ApiService) {
    }

    getUsers(): Observable<UserModel[]> {
        // Example mock data
        const users = [
            {
                id: 1,
                name: "amy denonato",
                avatar: "",
                email: "amy_denonato@gmail.com",
                password: "12345678",
                token: "aaaaaaa"
            },
            {
                id: 2,
                name: "sang dang",
                avatar: "",
                email: "sangdang@gmail.com",
                password: "12345aAA",
                token: ""
            }
        ];
        return of(users).pipe(map(arr => arr.map(val => UserModel.fromJson(val))));
    }

    login(data: { email: string; password: string; }): Observable<any> {
        return this.apiService.post(AuthApiService.LOGIN, data, {
            exposeHeaders: {
                [AppConstant.HTTP_STATUS_CODE_EXCLUDE]: ['401', '403']
            }
        });
    }

    getUserProfile(): Observable<UserModel> {
        return this.apiService.get(AuthApiService.USER_PROFILE).pipe(map(res => UserModel.fromJson(res)));
    }

    getUserPermission(): Observable<string[]> {
        return of([
            'item::read',
            'item::create',
            'item::update',
            'item::delete'
        ]);
    }
}
