import { Route } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CalendarCalendarsResolver, CalendarSettingsResolver, CalendarWeekdaysResolver } from './calendar.resolvers';

export const calendarRoutes: Route[] = [
    {
        path     : '',
        component: CalendarComponent,
        resolve  : {
            calendars: CalendarCalendarsResolver,
            settings : CalendarSettingsResolver,
            weekdays : CalendarWeekdaysResolver
        }
    }
];
