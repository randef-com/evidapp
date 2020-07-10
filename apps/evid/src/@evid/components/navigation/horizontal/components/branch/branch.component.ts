import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {EvidNavigationItem} from "../../../navigation.types";
import {EvidHorizontalNavigationComponent} from "../../horizontal.component";
import {EvidNavigationService} from "../../../navigation.service";

@Component({
    selector       : 'evid-horizontal-navigation-branch-item',
    templateUrl    : './branch.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvidHorizontalNavigationBranchItemComponent implements OnInit, OnDestroy
{
    // Child
    @Input()
    child: boolean;

    // Item
    @Input()
    item: EvidNavigationItem;

    // Mat menu
    @ViewChild('matMenu', {static: true})
    matMenu: MatMenu;

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

        // Set the defaults
        this.child = false;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Trigger the change detection
     */
    triggerChangeDetection(): void
    {
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
