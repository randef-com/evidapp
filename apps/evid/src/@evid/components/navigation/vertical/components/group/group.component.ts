import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {EvidNavigationItem} from "../../../navigation.types";
import {EvidVerticalNavigationComponent} from "../../vertical.component";
import {EvidNavigationService} from "../../../navigation.service";

@Component({
    selector       : 'evid-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvidVerticalNavigationGroupItemComponent implements OnInit, OnDestroy
{
    // Auto collapse
    @Input()
    autoCollapse: boolean;

    // Item
    @Input()
    item: EvidNavigationItem;

    // Name
    @Input()
    name: string;

    // Private
    private _EvidVerticalNavigationComponent: EvidVerticalNavigationComponent;
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._EvidVerticalNavigationComponent = this._EvidNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._EvidVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
