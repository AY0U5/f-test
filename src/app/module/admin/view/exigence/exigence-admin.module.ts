import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from "primeng/editor";

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {MultiSelectModule} from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";

import {FamilleExigenceCreateAdminComponent} from './famille-exigence/create/famille-exigence-create-admin.component';
import {FamilleExigenceEditAdminComponent} from './famille-exigence/edit/famille-exigence-edit-admin.component';
import {FamilleExigenceViewAdminComponent} from './famille-exigence/view/famille-exigence-view-admin.component';
import {FamilleExigenceListAdminComponent} from './famille-exigence/list/famille-exigence-list-admin.component';
import {ExigenceCreateAdminComponent} from './exigence/create/exigence-create-admin.component';
import {ExigenceEditAdminComponent} from './exigence/edit/exigence-edit-admin.component';
import {ExigenceViewAdminComponent} from './exigence/view/exigence-view-admin.component';
import {ExigenceListAdminComponent} from './exigence/list/exigence-list-admin.component';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';
import {
    ReferentielFamilleExigenceCreateAdminComponent
} from "./referentiel-famille-exigence/create/referentiel-famille-exigence-create-admin.component";
import {
    ReferentielFamilleExigenceListAdminComponent
} from "./referentiel-famille-exigence/list/referentiel-famille-exigence-list-admin.component";
import {
    ReferentielFamilleExigenceViewAdminComponent
} from "./referentiel-famille-exigence/view/referentiel-famille-exigence-view-admin.component";
import {
    ReferentielFamilleExigenceEditAdminComponent
} from "./referentiel-famille-exigence/edit/referentiel-famille-exigence-edit-admin.component";


@NgModule({
    declarations: [
        ReferentielFamilleExigenceCreateAdminComponent,
        ReferentielFamilleExigenceListAdminComponent,
        ReferentielFamilleExigenceViewAdminComponent,
        ReferentielFamilleExigenceEditAdminComponent,
        FamilleExigenceCreateAdminComponent,
        FamilleExigenceListAdminComponent,
        FamilleExigenceViewAdminComponent,
        FamilleExigenceEditAdminComponent,
        ExigenceCreateAdminComponent,
        ExigenceListAdminComponent,
        ExigenceViewAdminComponent,
        ExigenceEditAdminComponent,
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        PaginatorModule,
        TranslateModule,
        FileUploadModule,
        FullCalendarModule,
        CardModule,
        EditorModule,
        TagModule,


    ],
    exports: [
        ReferentielFamilleExigenceCreateAdminComponent,
        ReferentielFamilleExigenceListAdminComponent,
        ReferentielFamilleExigenceViewAdminComponent,
        ReferentielFamilleExigenceEditAdminComponent,
        FamilleExigenceCreateAdminComponent,
        FamilleExigenceListAdminComponent,
        FamilleExigenceViewAdminComponent,
        FamilleExigenceEditAdminComponent,
        ExigenceCreateAdminComponent,
        ExigenceListAdminComponent,
        ExigenceViewAdminComponent,
        ExigenceEditAdminComponent,
    ],
})
export class ExigenceAdminModule {
}
