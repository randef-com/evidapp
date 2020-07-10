import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {LandingHomeComponent} from "./home.component";
import {landingHomeRoutes} from "./home.routing";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        LandingHomeComponent
    ],
    imports     : [
        RouterModule.forChild(landingHomeRoutes),
        MatButtonModule,
        SharedModule
    ]
})
export class LandingHomeModule
{
}
