import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AuthSignUpComponent} from "./sign-up.component";
import {EvidCardModule} from "../../../../@evid/components/card";
import {EvidMessageModule} from "../../../../@evid/components/message/message.module";
import {SharedModule} from "../../../shared/shared.module";
import {authSignupRoutes} from "./sign-up.routing";


@NgModule({
    declarations: [
        AuthSignUpComponent
    ],
    imports     : [
        RouterModule.forChild(authSignupRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        EvidCardModule,
        EvidMessageModule,
        SharedModule
    ]
})
export class AuthSignUpModule
{
}
