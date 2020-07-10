import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AuthSignInComponent} from "./sign-in.component";
import {EvidCardModule} from "../../../../@evid/components/card";
import {authSignInRoutes} from "./sign-in.routing";
import {SharedModule} from "../../../shared/shared.module";
import {EvidMessageModule} from "../../../../@evid/components/message";


@NgModule({
    declarations: [
        AuthSignInComponent
    ],
    imports     : [
        RouterModule.forChild(authSignInRoutes),
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
export class AuthSignInModule
{
}
