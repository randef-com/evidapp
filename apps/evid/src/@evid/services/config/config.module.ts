import { ModuleWithProviders, NgModule } from '@angular/core';
import { EvidConfigService } from './config.service';
import { EVID_APP_CONFIG } from './config.constants';

@NgModule()
export class EvidConfigModule
{
    /**
     * Constructor
     *
     * @param {EvidConfigService} _evidConfigService
     */
    constructor(
        private _evidConfigService: EvidConfigService
    )
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<EvidConfigModule>
    {
        return {
            ngModule : EvidConfigModule,
            providers: [
                {
                    provide : EVID_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
