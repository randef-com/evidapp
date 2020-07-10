import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {EvidAnimations} from "../../../animations";
import {EvidNavigationItem} from "../navigation.types";
import {EvidNavigationService} from "../navigation.service";

@Component({
    selector       : 'evid-horizontal-navigation',
    templateUrl    : './horizontal.component.html',
    styleUrls      : ['./horizontal.component.scss'],
    animations     : EvidAnimations,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'EvidHorizontalNavigation'
})
export class EvidHorizontalNavigationComponent implements OnInit, OnDestroy
{
    onRefreshed: BehaviorSubject<boolean | null>;

    // Name
    @Input()
    name: string;

    // Private
    private _navigation: EvidNavigationItem[];
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {EvidNavigationService} _EvidNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _EvidNavigationService: EvidNavigationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Set the defaults
        this.onRefreshed = new BehaviorSubject(null);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for data
     */
    @Input()
    set navigation(value: EvidNavigationItem[])
    {
        // Store the value
        this._navigation = value;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    get navigation(): EvidNavigationItem[]
    {
        return this._navigation;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the navigation component
        this._EvidNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Deregister the navigation component from the registry
        this._EvidNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void
    {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
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
