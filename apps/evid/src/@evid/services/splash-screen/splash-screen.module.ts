import { NgModule } from '@angular/core';
import { EvidSplashScreenService } from './splash-screen.service';

@NgModule({
    providers: [
        EvidSplashScreenService
    ]
})
export class EvidSplashScreenModule
{
    /**
     * Constructor
     *
     * @param {EvidSplashScreenService} _evidSplashScreenService
     */
    constructor(
        private _evidSplashScreenService: EvidSplashScreenService
    )
    {
    }
}
