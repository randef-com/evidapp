import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {EvidAnimations} from "../../../../@evid/animations";

@Component({
    selector     : 'auth-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    styleUrls    : ['./confirmation-required.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : EvidAnimations
})
export class AuthConfirmationRequiredComponent implements OnInit
{
    email: string;

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the user's email
        this.email = 'watkins.andrew@company.com';
    }
}
