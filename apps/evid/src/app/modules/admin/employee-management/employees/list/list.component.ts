import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import {EvidMediaWatcherService} from "../../../../../../@evid/services/media-watcher";
import {IEmployee} from "../../../../../../../../../libs/api-interfaces/src/lib/employee.interface";
import {EmployeesService} from "../employees.service";

@Component({
    selector       : 'employees-list',
    templateUrl    : './list.component.html',
    styleUrls      : ['./list.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent implements OnInit, OnDestroy
{
    employees$: Observable<IEmployee[]>;
    employeesCount: number;
    employeesTableColumns: string[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl;
    selectedEmployee: IEmployee;

    @ViewChild('matDrawer', {static: true})
    matDrawer: MatDrawer;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _employeesService: EmployeesService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _evidMediaWatcherService: EvidMediaWatcherService
    )
    {
        this._unsubscribeAll = new Subject();
        this.employeesCount = 0;
        this.employeesTableColumns = ['name', 'email', 'roles', 'numberOfEmployments'];
        this.searchInputControl = new FormControl();
    }

    ngOnInit(): void
    {
        this.employees$ = this._employeesService.employees$;
        this._employeesService.employees$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((employees: IEmployee[]) => {

                this.employeesCount = employees.length;
                this._changeDetectorRef.markForCheck();
            });

        this._employeesService.employee$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((employee: IEmployee) => {

                this.selectedEmployee = employee;
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) => {
                  if(query === ""){
                    return this._employeesService.getEmployees();
                  }
                    return this._employeesService.searchEmployees(query);
                })
            )
            .subscribe();

        this._evidMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                this.drawerMode = state.matches ? 'side' : 'over';
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>((event) => {
                    return (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                        && (event.key === '/'); // '/'
                })
            )
            .subscribe(() => {
                this.createEmployee();
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goToEmployee(id: number): void
    {
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        this._router.navigate(['../', id], {relativeTo: route});
        this._changeDetectorRef.markForCheck();
    }

    onBackdropClicked(): void
    {
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        this._router.navigate(['../'], {relativeTo: route});
        this._changeDetectorRef.markForCheck();
    }

    createEmployee(): void
    {
        this._employeesService.createEmployee().subscribe((newEmployee) => {

            this.goToEmployee(newEmployee.id);
        });
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
