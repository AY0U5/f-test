import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';





import {DossierProjetAdminService} from 'src/app/shared/service/admin/projet/DossierProjetAdmin.service';
import {DossierProjetDto} from 'src/app/shared/model/projet/DossierProjet.model';
import {DossierProjetCriteria} from 'src/app/shared/criteria/projet/DossierProjetCriteria.model';
import {DossierProjetDocumentDto} from 'src/app/shared/model/projet/DossierProjetDocument.model';
import {DossierProjetDocumentAdminService} from 'src/app/shared/service/admin/projet/DossierProjetDocumentAdmin.service';
import {DossierProjetExigenceAppliqueDto} from 'src/app/shared/model/projet/DossierProjetExigenceApplique.model';
import {DossierProjetExigenceAppliqueAdminService} from 'src/app/shared/service/admin/projet/DossierProjetExigenceAppliqueAdmin.service';
import {DossierProjetExigenceDto} from 'src/app/shared/model/projet/DossierProjetExigence.model';
import {DossierProjetExigenceAdminService} from 'src/app/shared/service/admin/projet/DossierProjetExigenceAdmin.service';
import {ExigenceDto} from 'src/app/shared/model/exigence/Exigence.model';
import {ExigenceAdminService} from 'src/app/shared/service/admin/exigence/ExigenceAdmin.service';


@Component({
  selector: 'app-dossier-projet-create-admin',
  templateUrl: './dossier-projet-create-admin.component.html'
})
export class DossierProjetCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    protected dossierProjetExigencesIndex = -1;
    protected dossierProjetDocumentsIndex = -1;
    protected pdfFile: File;
    protected pages: Array<string> = [];

    private _dossierProjetExigences: Array<DossierProjetExigenceDto> = [];

    private _dossierProjetExigencesElement = new DossierProjetExigenceDto();
    private _dossierProjetDocumentsElement = new DossierProjetDocumentDto();


   private _validDossierProjetCode = true;
   private _validDossierProjetLibelle = true;
    private _validDossierProjetDocumentsCode = true;
    private _validDossierProjetDocumentsLibelle = true;

	constructor(private service: DossierProjetAdminService, private dossierProjetService: DossierProjetAdminService , private dossierProjetDocumentService: DossierProjetDocumentAdminService, private dossierProjetExigenceService: DossierProjetExigenceAdminService, private exigenceService: ExigenceAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);

    }

    ngOnInit(): void {
        this.dossierProjetExigencesElement.exigence = new ExigenceDto();
        this.exigenceService.findAll().subscribe(data => this.prepareDossierProjetExigences(data));
    }

    public onPdfFileSelected(event: any): void {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.pdfFile = input.files[0];

            if (!this.pdfFile) return;

            const formData = new FormData();
            formData.append('file', this.pdfFile);

            this.service.uploadPdf(formData).subscribe(
                (response) => {
                    this.pages = response;
                    console.log('pages after assignment = ', this.pages);
                },
                (error) => {
                    console.error('Error uploading PDF:', error);
                }
            );
        }
    }



    prepareDossierProjetExigences(exigences: Array<ExigenceDto>): void{
        if( exigences != null){
            exigences.forEach(e => {
                const dossierProjetExigence = new DossierProjetExigenceDto();
                dossierProjetExigence.exigence = e;
                this.dossierProjetExigences.push(dossierProjetExigence);
            });
        }
    }

    public save(): void {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.service.save().subscribe(item => {
            if (item != null) {
                this.items.push({...item});
                this.createDialog = false;
                this.submitted = false;
                this.item = new DossierProjetDto();
            } else {
                this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Element existant'});
            }

        }, error => {
            console.log(error);
        });
    }


    public hideCreateDialog() {
        this.createDialog = false;
        this.setValidation(true);
    }



    validateDossierProjetExigences(){
        this.errorMessages = new Array();
    }
    validateDossierProjetDocuments(){
        this.errorMessages = new Array();
        this.validateDossierProjetDocumentsCode();
        this.validateDossierProjetDocumentsLibelle();
    }


    public  setValidation(value: boolean){
        this.validDossierProjetCode = value;
        this.validDossierProjetLibelle = value;
        this.validDossierProjetDocumentsCode = value;
        this.validDossierProjetDocumentsLibelle = value;
    }

    public addDossierProjetExigences() {
        if( this.item.dossierProjetExigences == null )
            this.item.dossierProjetExigences = new Array<DossierProjetExigenceDto>();

       this.validateDossierProjetExigences();

       if (this.errorMessages.length === 0) {
            if (this.dossierProjetExigencesIndex == -1){
                this.item.dossierProjetExigences.push({... this.dossierProjetExigencesElement});
            }else {
                this.item.dossierProjetExigences[this.dossierProjetExigencesIndex] =this.dossierProjetExigencesElement;
            }
              this.dossierProjetExigencesElement = new DossierProjetExigenceDto();
              this.dossierProjetExigencesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteDossierProjetExigences(p: DossierProjetExigenceDto, index: number) {
        this.item.dossierProjetExigences.splice(index, 1);
    }

    public editDossierProjetExigences(p: DossierProjetExigenceDto, index: number) {
        this.dossierProjetExigencesElement = {... p};
        this.dossierProjetExigencesIndex = index;
        this.activeTab = 0;
    }
    public addDossierProjetDocuments() {
        if( this.item.dossierProjetDocuments == null )
            this.item.dossierProjetDocuments = new Array<DossierProjetDocumentDto>();

       this.validateDossierProjetDocuments();

       if (this.errorMessages.length === 0) {
            if (this.dossierProjetDocumentsIndex == -1){
                this.item.dossierProjetDocuments.push({... this.dossierProjetDocumentsElement});
            }else {
                this.item.dossierProjetDocuments[this.dossierProjetDocumentsIndex] =this.dossierProjetDocumentsElement;
            }
              this.dossierProjetDocumentsElement = new DossierProjetDocumentDto();
              this.dossierProjetDocumentsIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteDossierProjetDocuments(p: DossierProjetDocumentDto, index: number) {
        this.item.dossierProjetDocuments.splice(index, 1);
    }

    public editDossierProjetDocuments(p: DossierProjetDocumentDto, index: number) {
        this.dossierProjetDocumentsElement = {... p};
        this.dossierProjetDocumentsIndex = index;
        this.activeTab = 0;
    }


    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateDossierProjetCode();
        this.validateDossierProjetLibelle();
    }

    public validateDossierProjetCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
        this.errorMessages.push('Code non valide');
        this.validDossierProjetCode = false;
        } else {
            this.validDossierProjetCode = true;
        }
    }
    public validateDossierProjetLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validDossierProjetLibelle = false;
        } else {
            this.validDossierProjetLibelle = true;
        }
    }

    public validateDossierProjetDocumentsCode(){
        if (this.dossierProjetDocumentsElement.code == null) {
            this.errorMessages.push('Code de la dossierProjetDocument est  invalide');
            this.validDossierProjetDocumentsCode = false;
        } else {
            this.validDossierProjetDocumentsCode = true;
        }
    }
    public validateDossierProjetDocumentsLibelle(){
        if (this.dossierProjetDocumentsElement.libelle == null) {
            this.errorMessages.push('Libelle de la dossierProjetDocument est  invalide');
            this.validDossierProjetDocumentsLibelle = false;
        } else {
            this.validDossierProjetDocumentsLibelle = true;
        }
    }


    get exigence(): ExigenceDto {
        return this.exigenceService.item;
    }
    set exigence(value: ExigenceDto) {
        this.exigenceService.item = value;
    }
    get exigences(): Array<ExigenceDto> {
        return this.exigenceService.items;
    }
    set exigences(value: Array<ExigenceDto>) {
        this.exigenceService.items = value;
    }
    get createExigenceDialog(): boolean {
        return this.exigenceService.createDialog;
    }
    set createExigenceDialog(value: boolean) {
        this.exigenceService.createDialog= value;
    }



    get validDossierProjetCode(): boolean {
        return this._validDossierProjetCode;
    }

    set validDossierProjetCode(value: boolean) {
         this._validDossierProjetCode = value;
    }
    get validDossierProjetLibelle(): boolean {
        return this._validDossierProjetLibelle;
    }

    set validDossierProjetLibelle(value: boolean) {
         this._validDossierProjetLibelle = value;
    }

    get validDossierProjetDocumentsCode(): boolean {
        return this._validDossierProjetDocumentsCode;
    }
    set validDossierProjetDocumentsCode(value: boolean) {
        this._validDossierProjetDocumentsCode = value;
    }
    get validDossierProjetDocumentsLibelle(): boolean {
        return this._validDossierProjetDocumentsLibelle;
    }
    set validDossierProjetDocumentsLibelle(value: boolean) {
        this._validDossierProjetDocumentsLibelle = value;
    }

    get dossierProjetExigencesElement(): DossierProjetExigenceDto {
        if( this._dossierProjetExigencesElement == null )
            this._dossierProjetExigencesElement = new DossierProjetExigenceDto();
        return this._dossierProjetExigencesElement;
    }

    set dossierProjetExigencesElement(value: DossierProjetExigenceDto) {
        this._dossierProjetExigencesElement = value;
    }
    get dossierProjetDocumentsElement(): DossierProjetDocumentDto {
        if( this._dossierProjetDocumentsElement == null )
            this._dossierProjetDocumentsElement = new DossierProjetDocumentDto();
        return this._dossierProjetDocumentsElement;
    }

    set dossierProjetDocumentsElement(value: DossierProjetDocumentDto) {
        this._dossierProjetDocumentsElement = value;
    }

    get items(): Array<DossierProjetDto> {
        return this.service.items;
    }

    set items(value: Array<DossierProjetDto>) {
        this.service.items = value;
    }

    get item(): DossierProjetDto {
        return this.service.item;
    }

    set item(value: DossierProjetDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): DossierProjetCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierProjetCriteria) {
        this.service.criteria = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        if (this._errorMessages == null) {
            this._errorMessages = new Array<string>();
        }
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validate(): boolean {
        return this.service.validate;
    }

    set validate(value: boolean) {
        this.service.validate = value;
    }


    get activeTab(): number {
        return this._activeTab;
    }

    set activeTab(value: number) {
        this._activeTab = value;
    }
    get dossierProjetExigences(): Array<DossierProjetExigenceDto> {
        if( this._dossierProjetExigences == null )
            this._dossierProjetExigences = new Array();
        return this._dossierProjetExigences;
    }

    set dossierProjetExigences(value: Array<DossierProjetExigenceDto>) {
        this._dossierProjetExigences = value;
    }

}
