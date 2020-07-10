import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {DenseLayoutComponent} from "./dense.component";
import {EvidNavigationModule} from "../../../../../@evid/components/navigation/navigation.module";
import {MessagesModule} from "../../../common/messages/messages.module";
import {NotificationsModule} from "../../../common/notifications/notifications.module";
import {SearchModule} from "../../../common/search/search.module";
import {ShortcutsModule} from "../../../common/shortcuts/shortcuts.module";
import {UserModule} from "../../../common/user/user.module";
import {SharedModule} from "../../../../shared/shared.module";


@NgModule({
    declarations: [
        DenseLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        EvidNavigationModule,
        MessagesModule,
        NotificationsModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        DenseLayoutComponent
    ]
})
export class DenseLayoutModule
{
}
