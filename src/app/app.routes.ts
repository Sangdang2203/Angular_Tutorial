import { Routes } from '@angular/router';
import { ForbiddenComponent } from './modules/forbidden/forbidden.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { UserComponent } from './modules/user/user.component';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LogoutComponent } from './modules/auth/logout/logout.component';
import { UserResolver } from './shared/resolvers/user.resolver';
import { ItemComponent } from './modules/item/item.component';
import { PolicyGuard } from './core/policy/policy.guard';
import { ContactComponent } from './modules/contact/contact.component';
import { AccountComponent } from './modules/auth/login/account/account.component';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // resolve: {
    //   user: UserResolver,
    // },
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: UserComponent,
      },
      {
        path: 'contacts',
        component: ContactComponent,
        canActivate: [PolicyGuard],
        data: {
          policy: 'item::read',
        },
      },
      {
        path: 'item',
        component: ItemComponent,
        canActivate: [PolicyGuard],
        data: {
          policy: 'item::read',
        },
      },
    ],
  },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
  //{ path: '**', redirectTo: '/404' },

];
