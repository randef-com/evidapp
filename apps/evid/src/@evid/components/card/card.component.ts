import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { EvidAnimations } from '../../animations';

@Component({
    selector     : 'evid-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : EvidAnimations,
    exportAs     : 'evidCard'
})
export class EvidCardComponent
{
    expanded: boolean;
    flipped: boolean;

    // Private
    private _flippable: boolean;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer2
     */
    constructor(
        private _elementRef: ElementRef,
        private _renderer2: Renderer2
    )
    {
        // Set the defaults
        this.expanded = false;
        this.flippable = false;
        this.flipped = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for flippable
     *
     * @param value
     */
    @Input()
    set flippable(value: boolean)
    {
        // If the value is the same, return...
        if ( this._flippable === value )
        {
            return;
        }

        // Update the class name
        if ( value )
        {
            this._renderer2.addClass(this._elementRef.nativeElement, 'evid-card-flippable');
        }
        else
        {
            this._renderer2.removeClass(this._elementRef.nativeElement, 'evid-card-flippable');
        }

        // Store the value
        this._flippable = value;
    }

    get flippable(): boolean
    {
        return this._flippable;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Expand the details
     */
    expand(): void
    {
        this.expanded = true;
    }

    /**
     * Collapse the details
     */
    collapse(): void
    {
        this.expanded = false;
    }

    /**
     * Toggle the expand/collapse status
     */
    toggleExpanded(): void
    {
        this.expanded = !this.expanded;
    }

    /**
     * Flip the card
     */
    flip(): void
    {
        // Return if not flippable
        if ( !this.flippable )
        {
            return;
        }

        this.flipped = !this.flipped;

        // Update the class name
        if ( this.flipped )
        {
            this._renderer2.addClass(this._elementRef.nativeElement, 'evid-card-flipped');
        }
        else
        {
            this._renderer2.removeClass(this._elementRef.nativeElement, 'evid-card-flipped');
        }
    }
}
