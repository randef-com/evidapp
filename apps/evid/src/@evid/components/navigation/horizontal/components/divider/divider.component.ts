import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {EvidNavigationItem} from "../../../navigation.types";
import {EvidHorizontalNavigationComponent} from "../../horizontal.component";
import {EvidNavigationService} from "../../../navigation.service";

@Component({
    selector       : 'evid-horizontal-navigation-divider-item',
    templateUrl    : './divider.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvidHorizontalNavigationDividerItemComponent implements OnInit, OnDestroy
{
    // Item
    @Input()
    item: EvidNavigationItem;

    // Name
    @Input()
    name: string;

    // Private
    private _EvidHorizontalNavigationComponent: EvidHorizontalNavigationComponent;
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
        this._EvidHorizontalNavigationComponent = this._EvidNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._EvidHorizontalNavigationComponent.onRefreshed.pipe(
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
}
