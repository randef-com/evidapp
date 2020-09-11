import { Route } from '@angular/router';
import {WorkExportComponent} from "./work-export.component";
import {FormComponent} from "./form/form.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {
  CalendarCalendarsResolver,
  CalendarSettingsResolver,
  CalendarWeekdaysResolver
} from "./calendar/calendar.resolvers";
import {EmployeesResolver} from "../employees/employees.resolvers";


export const employeesRoutes: Route[] = [
  {
    path     : '',
    component: WorkExportComponent,
    children : [
      {
        path     : '',
        component: FormComponent,
        resolve  : {
          tasks    : EmployeesResolver,
        },
      },
      {
        path         : '/calendar',
        component    : CalendarComponent,
        resolve  : {
          calendars: CalendarCalendarsResolver,
          settings : CalendarSettingsResolver,
          weekdays : CalendarWeekdaysResolver
        }
      }
    ]
  }
];
