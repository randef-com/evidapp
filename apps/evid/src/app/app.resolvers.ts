import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {Shortcut} from "./layout/common/shortcuts/shortcuts.types";
import {EvidNavigationItem} from "../@evid/components/navigation";

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{

    constructor(
        private _httpClient: HttpClient
    ) {}

    private _loadNavigation(): Observable<any>
    {
      const navigation: EvidNavigationItem[] = [
        {
          id      : 'dashboards',
          title   : 'Dashboards',
          type    : 'group',
          icon    : 'heroicons_outline:home',
          children: [
            {
              id   : 'dashboards.finance',
              title: 'Finance',
              type : 'basic',
              icon : 'heroicons_outline:cash',
              link : '/dashboards/finance'
            }
        ]},
        {
          id: 'employee-management',
          title: 'Správa zaměstnanců',
          type: 'group',
          icon: 'heroicons_outline:user-group',
          children: [
            {
              id   : 'employee-management.jobs',
              title: 'Pracovní pozice',
              type : 'basic',
              icon : 'heroicons_outline:briefcase',
              link : '/employee-management/jobs'
            },
            {
              id   : 'employee-management.employees',
              title: 'Zaměstnanci',
              type : 'basic',
              icon : 'heroicons_outline:user',
              link : '/employee-management/employees'
            }

          ]
        },
        {
          id      : 'applications',
          title   : 'Výkazy',
          type    : 'group',
          icon    : 'heroicons_outline:book-open',
          children: [
            {
              id      : 'applications.employee-export',
              title   : 'Výkaz zaměstnance',
              type    : 'basic',
              icon    : 'heroicons_outline:briefcase',
              link    : '/employee-management/calendar'
            },
            {
              id      : 'applications.variable-export',
              title   : 'Výkaz směn',
              type    : 'basic',
              icon    : 'heroicons_outline:calendar',
              link    : '/employee-management/calendar'
            }
          ]
        },];
        return of({navigation})
    }

    private _loadShortcuts(): Observable<any>
    {
      const shortcuts: Shortcut[] = [
        {
          id         : 'a1ae91d3-e2cb-459b-9be9-a184694f548b',
          label      : 'Changelog',
          description: 'Latest version: v1.2',
          icon       : 'list_alt',
          link       : 'apps/analytics-dashboard',
          useRouter  : true
        },
        {
          id         : '989ce876-c177-4d71-a749-1953c477f825',
          label      : 'Documentation',
          description: 'Getting started',
          icon       : 'chrome_reader_mode',
          link       : 'apps/analytics-dashboard',
          useRouter  : true
        },
        {
          id         : '2496f42e-2f25-4e34-83d5-3ff9568fd984',
          label      : 'Help center',
          description: 'FAQs and guides',
          icon       : 'info',
          link       : 'pages/help-center',
          useRouter  : true
        },
        {
          id         : '3c48e75e-2ae7-4b73-938a-12dc655be28b',
          label      : 'Dashboard',
          description: 'User analytics',
          icon       : 'dashboard',
          link       : 'apps/analytics-dashboard',
          useRouter  : true
        },
        {
          id         : '34fb28db-4ec8-4570-8584-2414d6de796b',
          label      : 'Calendar',
          description: 'Latest appointments',
          icon       : 'calendar_today',
          link       : 'apps/calendar',
          useRouter  : true
        },
        {
          id         : '2daac375-a2f7-4393-b4d7-ce6061628b66',
          label      : 'Mailbox',
          description: '5 new e-mails',
          icon       : 'mail',
          link       : 'apps/mailbox',
          useRouter  : true
        },
        {
          id         : '56a0a561-17e7-40b3-bd75-0b6cef230b7e',
          label      : 'Tasks',
          description: '12 unfinished tasks',
          icon       : 'mail',
          link       : 'apps/tasks',
          useRouter  : true
        },
        {
          id         : 'f5daf93e-b6f3-4199-8a0c-b951e92a6cb8',
          label      : 'Contacts',
          description: 'List all contacts',
          icon       : 'account_box',
          link       : 'apps/contacts',
          useRouter  : true
        },
        {
          id         : '0a240ab8-e19d-4503-bf68-20013030d526',
          label      : 'Reload',
          description: 'Restart the app',
          icon       : 'refresh',
          link       : 'apps/analytics-dashboard',
          useRouter  : false
        }
      ];
      return of({shortcuts});
    }

    private _loadUser(): Observable<Object>
    {
      return this._httpClient.get('api/profile');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return forkJoin([


            // Navigation data
            this._loadNavigation(),

            // Shortcuts
            this._loadShortcuts(),

            // User
            this._loadUser()
        ]).pipe(
            map((data) => {
                return {
                    navigation   : {
                        compact   : data[0].navigation,
                        default   : data[0].navigation,
                        futuristic: data[0].navigation,
                        horizontal: data[0].navigation
                    },
                    notifications: data[1].notifications,
                    user         : data[2]
                };
            })
        );
    }
}
