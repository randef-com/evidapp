import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {AuthConfirmationRequiredComponent} from "./confirmation-required.component";
import {EvidCardModule} from "../../../../@evid/components/card";
import {SharedModule} from "../../../shared/shared.module";
import {authConfirmationRequiredRoutes} from "./confirmation-required.routing";

@NgModule({
    declarations: [
        AuthConfirmationRequiredComponent
    ],
    imports     : [
        RouterModule.forChild(authConfirmationRequiredRoutes),
        MatButtonModule,
        EvidCardModule,
        SharedModule
    ]
})
export class AuthConfirmationRequiredModule
{
}
