import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {AuthSignOutComponent} from "./sign-out.component";
import {authSignOutRoutes} from "./sign-out.routing";
import {EvidCardModule} from "../../../../@evid/components/card";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [
        AuthSignOutComponent
    ],
    imports     : [
        RouterModule.forChild(authSignOutRoutes),
        MatButtonModule,
        EvidCardModule,
        SharedModule
    ]
})
export class AuthSignOutModule
{
}
