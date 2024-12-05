import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from "primeng/editor";

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";

import { DossierProjetCreateAdminComponent } from './dossier-projet/create/dossier-projet-create-admin.component';
import { DossierProjetEditAdminComponent } from './dossier-projet/edit/dossier-projet-edit-admin.component';
import { DossierProjetViewAdminComponent } from './dossier-projet/view/dossier-projet-view-admin.component';
import { DossierProjetListAdminComponent } from './dossier-projet/list/dossier-projet-list-admin.component';
import { DossierProjetExigenceEtatCreateAdminComponent } from './dossier-projet-exigence-etat/create/dossier-projet-exigence-etat-create-admin.component';
import { DossierProjetExigenceEtatEditAdminComponent } from './dossier-projet-exigence-etat/edit/dossier-projet-exigence-etat-edit-admin.component';
import { DossierProjetExigenceEtatViewAdminComponent } from './dossier-projet-exigence-etat/view/dossier-projet-exigence-etat-view-admin.component';
import { DossierProjetExigenceEtatListAdminComponent } from './dossier-projet-exigence-etat/list/dossier-projet-exigence-etat-list-admin.component';
import { DossierProjetDocumentCreateAdminComponent } from './dossier-projet-document/create/dossier-projet-document-create-admin.component';
import { DossierProjetDocumentEditAdminComponent } from './dossier-projet-document/edit/dossier-projet-document-edit-admin.component';
import { DossierProjetDocumentViewAdminComponent } from './dossier-projet-document/view/dossier-projet-document-view-admin.component';
import { DossierProjetDocumentListAdminComponent } from './dossier-projet-document/list/dossier-projet-document-list-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [

    DossierProjetCreateAdminComponent,
    DossierProjetListAdminComponent,
    DossierProjetViewAdminComponent,
    DossierProjetEditAdminComponent,
    DossierProjetExigenceEtatCreateAdminComponent,
    DossierProjetExigenceEtatListAdminComponent,
    DossierProjetExigenceEtatViewAdminComponent,
    DossierProjetExigenceEtatEditAdminComponent,
    DossierProjetDocumentCreateAdminComponent,
    DossierProjetDocumentListAdminComponent,
    DossierProjetDocumentViewAdminComponent,
    DossierProjetDocumentEditAdminComponent,
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
  DossierProjetCreateAdminComponent,
  DossierProjetListAdminComponent,
  DossierProjetViewAdminComponent,
  DossierProjetEditAdminComponent,
  DossierProjetExigenceEtatCreateAdminComponent,
  DossierProjetExigenceEtatListAdminComponent,
  DossierProjetExigenceEtatViewAdminComponent,
  DossierProjetExigenceEtatEditAdminComponent,
  DossierProjetDocumentCreateAdminComponent,
  DossierProjetDocumentListAdminComponent,
  DossierProjetDocumentViewAdminComponent,
  DossierProjetDocumentEditAdminComponent,
  ],
})
export class ProjetAdminModule { }
