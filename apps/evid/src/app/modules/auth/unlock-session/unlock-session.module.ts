import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AuthUnlockSessionComponent} from "./unlock-session.component";
import {authUnlockSessionRoutes} from "./unlock-session.routing";
import {EvidCardModule} from "../../../../@evid/components/card";
import {EvidMessageModule} from "../../../../@evid/components/message/message.module";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
    declarations: [
        AuthUnlockSessionComponent
    ],
    imports     : [
        RouterModule.forChild(authUnlockSessionRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        EvidCardModule,
        EvidMessageModule,
        SharedModule
    ]
})
export class AuthUnlockSessionModule
{
}
