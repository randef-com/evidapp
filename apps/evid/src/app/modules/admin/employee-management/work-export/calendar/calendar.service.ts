import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Moment} from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {Calendar, CalendarEvent, CalendarEventEditMode, CalendarSettings, CalendarWeekday} from './calendar.types';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // Private
  private _calendars: BehaviorSubject<Calendar[] | null>;
  private _events: BehaviorSubject<CalendarEvent[]>;
  private _loadedEventsRange: { start: Moment | null, end: Moment | null };
  private _settings: BehaviorSubject<CalendarSettings | null>;
  private _weekdays: BehaviorSubject<CalendarWeekday[] | null>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient
  ) {
    // Set the private defaults
    this._calendars = new BehaviorSubject(null);
    this._events = new BehaviorSubject([]);
    this._loadedEventsRange = {
      start: null,
      end: null
    };
    this._settings = new BehaviorSubject(null);
    this._weekdays = new BehaviorSubject(null);
  }

  get calendars$(): Observable<Calendar[]> {
    return this._calendars.asObservable();
  }

  get events$(): Observable<CalendarEvent[]> {
    return this._events.asObservable();
  }

  get settings$(): Observable<CalendarSettings> {
    return this._settings.asObservable();
  }

  get weekdays$(): Observable<CalendarWeekday[]> {
    return this._weekdays.asObservable();
  }

  getCalendars(): Observable<Calendar[]> {
    const calendars = [
      {
        id: '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title: 'Směna',
        color: 'teal',
        visible: true
      },
      {
        id: '5dab5f7b-757a-4467-ace1-305fe07b11fe',
        title: 'Neplacené volno',
        color: 'red',
        visible: true
      },
      {
        id: '09887870-f85a-40eb-8171-1b13d7a7f529',
        title: 'Nemocenská',
        color: 'pink',
        visible: true
      },
      {
        id: 'df432938-f147-4524-a337-7c51be4bf31f',
        title: 'Dovolená',
        color: 'indigo',
        visible: true
      },
      {
        id: '28b020eb-eba4-402a-bbac-dc8e3108cf3d',
        title: 'Ošetřování člena rodiny',
        color: 'gray',
        visible: true
      }
    ];

    return of(calendars).pipe(
      tap((response) => {
        this._calendars.next(response);
      })
    );
  }

  updateCalendar(id: string, calendar: Calendar): Observable<Calendar>
  {
    return this.calendars$.pipe(
      take(1),
      switchMap(calendars => of(calendar).pipe(
        map((updatedCalendar) => {

          // Find the index of the updated calendar
          const index = calendars.findIndex(item => item.id === id);

          // Update the calendar
          calendars[index] = updatedCalendar;

          // Update the calendars
          this._calendars.next(calendars);

          // Return the updated calendar
          return updatedCalendar;
        })
      ))
    );
  }


  addEvent(event): Observable<CalendarEvent> {
    const uuid = uuidv4();
    return this.events$.pipe(
      take(1),
      switchMap(events => of(event).pipe(
        map((addedEvent) => {
          addedEvent.id = uuid;
          events.push({
            id: uuid,
            ...addedEvent
          })
          this._events.next(events);

          return addedEvent;
        })
      ))
    );
  }


  updateEvent(id: string, event: CalendarEvent): Observable<CalendarEvent> {

    return this.events$.pipe(
      take(1),
      switchMap(events => of(event).pipe(
        map((updatedEvent) => {

          const index = events.findIndex(item => item.id === updatedEvent.id);
          events[index] = updatedEvent;

          this._events.next(events);
          return updatedEvent;
        })
      ))
    );
  }

  updateRecurringEvent(event, originalEvent, mode: CalendarEventEditMode): Observable<boolean> {
    return of(true);

    // return this._httpClient.patch<boolean>('api/apps/calendar/recurring-event', {
    //   event,
    //   originalEvent,
    //   mode
    // });
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.events$.pipe(
      take(1),
      switchMap(events => of(id).pipe(
        map((eventId) => {

          const index = events.findIndex(item => item.id === eventId);
          events.splice(index,1);

          this._events.next(events);
          return true;
        })
      ))
    );
  }

  deleteRecurringEvent(event, mode: CalendarEventEditMode): Observable<boolean> {
    return of(true);
    // return this._httpClient.delete<boolean>('api/apps/calendar/recurring-event', {
    //   params: {
    //     event: JSON.stringify(event),
    //     mode
    //   }
    // });
  }

  getSettings(): Observable<CalendarSettings> {
    const settings = {
      dateFormat: 'DD/MM/YYYY',
      timeFormat : '24',
      startWeekOn: 1,
    };

    return of(settings).pipe(
      tap((response) => {
        this._settings.next(response);
      })
    );
  }

  getWeekdays(): Observable<CalendarWeekday[]> {

    const weekdays = [
      {
        abbr : 'Po',
        label: 'Pondělí',
        value: 'MO'
      },
      {
        abbr : 'Út',
        label: 'Úterý',
        value: 'TU'
      },
      {
        abbr : 'St',
        label: 'Středa',
        value: 'WE'
      },
      {
        abbr : 'Čt',
        label: 'Čtvrtek',
        value: 'TH'
      },
      {
        abbr : 'Pá',
        label: 'Fátek',
        value: 'FR'
      },
      {
        abbr : 'So',
        label: 'Sobota',
        value: 'SA'
      },
      {
        abbr : 'Ne',
        label: 'Neděle',
        value: 'SU'
      }
    ];

    return of(weekdays).pipe(
      tap((response) => {
        this._weekdays.next(response);
      })
    );
  }
}
