import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {EvidNavigationItem} from "../../../navigation.types";
import {EvidVerticalNavigationComponent} from "../../vertical.component";
import {EvidNavigationService} from "../../../navigation.service";

@Component({
    selector       : 'evid-vertical-navigation-aside-item',
    templateUrl    : './aside.component.html',
    styles         : [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvidVerticalNavigationAsideItemComponent implements OnInit, OnDestroy
{
    active: boolean;

    // Auto collapse
    @Input()
    autoCollapse: boolean;

    // Item
    @Input()
    item: EvidNavigationItem;

    // Name
    @Input()
    name: string;

    // Skip children
    @Input()
    skipChildren: boolean;

    // Private
    private _activeItemId: string;
    private _EvidVerticalNavigationComponent: EvidVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {Router} _router
     * @param {EvidNavigationService} _EvidNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _EvidNavigationService: EvidNavigationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Set the defaults
        this.skipChildren = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for activeItemId
     *
     * @param value
     */
    @Input()
    set activeItemId(value: string)
    {
        // If the value is the same, return...
        if ( this._activeItemId === value )
        {
            return;
        }

        // Store the value
        this._activeItemId = value;

        // Mark if active
        this._markIfActive(this._router.url);
    }

    get activeItemId(): string
    {
        return this._activeItemId;
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

        // Mark if active
        this._markIfActive(this._router.url);

        // Attach a listener to the NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event: NavigationEnd) => {

                // Mark if active
                this._markIfActive(event.urlAfterRedirects);
            });

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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check if the given item has the given url
     * in one of its children
     *
     * @param item
     * @param url
     * @private
     */
    private _hasCurrentUrlInChildren(item, url): boolean
    {
        const children = item.children;

        if ( !children )
        {
            return false;
        }

        for ( const child of children )
        {
            if ( child.children )
            {
                if ( this._hasCurrentUrlInChildren(child, url) )
                {
                    return true;
                }
            }

            // Check if the item's link is the exact same of the
            // current url
            if ( child.link === url )
            {
                return true;
            }

            // If exactMatch is not set for the item, also check
            // if the current url starts with the item's link and
            // continues with a question mark, a pound sign or a
            // slash
            if ( !child.exactMatch && (child.link === url || url.startsWith(child.link + '?') || url.startsWith(child.link + '#') || url.startsWith(child.link + '/')) )
            {
                return true;
            }
        }

        return false;
    }

    /**
     * Decide and mark if the item is active
     *
     * @private
     */
    private _markIfActive(url): void
    {
        // If the aside has a children that is active,
        // always mark it as active
        if ( this._hasCurrentUrlInChildren(this.item, url) )
        {
            this.active = true;
            return;
        }

        // Check if the activeItemId is equals to this item id
        this.active = this.activeItemId === this.item.id;
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
