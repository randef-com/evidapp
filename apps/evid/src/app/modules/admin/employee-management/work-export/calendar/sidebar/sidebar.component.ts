import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Calendar} from '../calendar.types';
import {CalendarService} from '../calendar.service';
import {calendarColors} from './calendar-colors';

@Component({
  selector: 'calendar-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarSidebarComponent implements OnInit, OnDestroy {
  calendar: Calendar | null;
  calendarColors: any;
  calendars: Calendar[];

  @Output()
  calendarUpdated: EventEmitter<any>;

  private _unsubscribeAll: Subject<any>;

  @ViewChild('editPanel')
  private _editPanel: TemplateRef<any>;


  constructor(
    private _calendarService: CalendarService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Set the defaults
    this.calendarColors = calendarColors;
    this.calendarUpdated = new EventEmitter();
  }

  ngOnInit(): void {
    // Get calendars
    this._calendarService.calendars$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((calendars) => {

        this.calendars = calendars;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleCalendarVisibility(calendar: Calendar): void {
    // Toggle the visibility
    calendar.visible = !calendar.visible;

    this._calendarService.updateCalendar(calendar.id, calendar).subscribe(() => {

      // Emit the calendarUpdated event
      this.calendarUpdated.emit();
    });

  }
}
