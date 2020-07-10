import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import {AppComponent} from "./app.component";
import {appRoutes} from "./app.routing";
import {EvidModule} from "../@evid";
import {EvidConfigModule} from "../@evid/services/config";
import {appConfig} from "./core/config/app.config";
import {CoreModule} from "./core/core.module";
import {LayoutModule} from "./layout/layout.module";


const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        EvidModule,
        EvidConfigModule.forRoot(appConfig),

        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
