import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import {EvidAnimations} from "../../../../@evid/animations";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls    : ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : EvidAnimations
})
export class AuthSignInComponent implements OnInit
{
    signInForm: FormGroup;
    message: any;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {AuthService} _authService
     * @param {FormBuilder} _formBuilder
     * @param {Router} _router
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
        this.message = null;
    }

    ngOnInit(): void
    {
        this.signInForm = this._formBuilder.group({
            email     : [''],
            password  : ['']
        });
    }


    signIn(): void
    {
        // Disable the form
        this.signInForm.disable();

        this.message = null;

        // Get the credentials
        const credentials = this.signInForm.value;

        // Sign in
        this._authService.signIn(credentials)
            .subscribe(() => {

                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                // Navigate to the redirect url
                this._router.navigateByUrl(redirectURL);

            }, (response) => {

                this.signInForm.enable();
                let error = response.error.message;
                console.log(response.error)
                if(response.error.statusCode === 401)
                {
                  error = "Nesprávné jméno nebo heslo!"
                }
                this.message = {
                    appearance: 'outline',
                    content   : error,
                    shake     : true,
                    showIcon  : false,
                    type      : 'error'
                };
            });
    }
}
