export interface Calendar
{
    id: string;
    title: string;
    color: string;
    visible: boolean;
}

export type CalendarDrawerMode = 'over' | 'side';

export interface CalendarEvent
{
    id: string;
    calendarId: string;
    recurringEventId: string | null;
    isFirstInstance: boolean;
    title: string;
    description: string;
    start: string | null;
    end: string | null;
    allDay: boolean;
    recurrence: string;
}

export interface CalendarEventException
{
    id: string;
    eventId: string;
    exdate: string;
}

export type CalendarEventPanelMode = 'view' | 'add' | 'edit';
export type CalendarEventEditMode = 'single' | 'future' | 'all';

export interface CalendarSettings
{
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'll' | string;
    timeFormat: '12' | '24' | string;
    startWeekOn: 6 | 0 | 1 | number;
}

export interface CalendarWeekday
{
    abbr: string;
    label: string;
    value: string;
}
