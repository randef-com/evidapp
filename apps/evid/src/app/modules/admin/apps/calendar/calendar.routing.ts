import { Route } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CalendarSettingsComponent } from './settings/settings.component';
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
    },
    {
        path     : 'settings',
        component: CalendarSettingsComponent,
        resolve  : {
            settings: CalendarSettingsResolver
        }
    }
];
