import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarService } from './calendar.service';
import { Calendar, CalendarSettings, CalendarWeekday } from './calendar.types';

@Injectable({ providedIn: 'root' })
export class CalendarCalendarsResolver implements Resolve<any>
{
    constructor(
        private _calendarService: CalendarService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Calendar[]>
    {
        return this._calendarService.getCalendars();
    }
}

@Injectable({ providedIn: 'root' })
export class CalendarSettingsResolver implements Resolve<any>
{
    constructor(
        private _calendarService: CalendarService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CalendarSettings>
    {
        return this._calendarService.getSettings();
    }
}

@Injectable({ providedIn: 'root' })
export class CalendarWeekdaysResolver implements Resolve<any>
{
    constructor(
        private _calendarService: CalendarService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CalendarWeekday[]>
    {
        return this._calendarService.getWeekdays();
    }
}
