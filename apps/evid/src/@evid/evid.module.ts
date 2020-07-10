import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {EvidMediaWatcherModule} from "./services/media-watcher";
import {EvidSplashScreenModule} from "./services/splash-screen";

@NgModule({
    imports  : [
        EvidMediaWatcherModule,
        EvidSplashScreenModule
    ],
    providers: [
        {
            // Use the 'fill' appearance on form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class EvidModule
{
    /**
     * Constructor
     *
     * @param parentModule
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: EvidModule
    )
    {
        if ( parentModule )
        {
            throw new Error('EvidModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
