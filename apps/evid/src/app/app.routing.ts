import { Route } from '@angular/router';
import {NoAuthGuard} from "./core/auth/guards/noAuth.guard";
import {LayoutComponent} from "./layout/layout.component";
import {AuthGuard} from "./core/auth/guards/auth.guard";
import {InitialDataResolver} from "./app.resolvers";

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/finance'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/finance'},

    // Redirect signed in user to the '/dashboards/finance'
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/finance'},

    // Auth routes (guest)
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'forgot-password', loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('./modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        ]
    },

    // Auth routes (logged in)
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('./modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'finance', loadChildren: () => import('./modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)},
            ]},

            // Apps
            {path: 'apps', children: [
                {path: 'calendar', loadChildren: () => import('./modules/admin/apps/calendar/calendar.module').then(m => m.CalendarModule)},
                {path: 'contacts', loadChildren: () => import('./modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule)},
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('./modules/admin/pages/errors/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
