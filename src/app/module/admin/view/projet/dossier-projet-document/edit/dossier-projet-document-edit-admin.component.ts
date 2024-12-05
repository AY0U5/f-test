import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {DossierProjetDocumentAdminService} from 'src/app/shared/service/admin/projet/DossierProjetDocumentAdmin.service';
import {DossierProjetDocumentDto} from 'src/app/shared/model/projet/DossierProjetDocument.model';
import {DossierProjetDocumentCriteria} from 'src/app/shared/criteria/projet/DossierProjetDocumentCriteria.model';


import {DossierProjetExigenceEtatDto} from 'src/app/shared/model/projet/DossierProjetExigenceEtat.model';
import {DossierProjetExigenceEtatAdminService} from 'src/app/shared/service/admin/projet/DossierProjetExigenceEtatAdmin.service';
import {DossierProjetExigenceAppliqueDto} from 'src/app/shared/model/projet/DossierProjetExigenceApplique.model';
import {DossierProjetExigenceAppliqueAdminService} from 'src/app/shared/service/admin/projet/DossierProjetExigenceAppliqueAdmin.service';
import {DossierProjetDto} from 'src/app/shared/model/projet/DossierProjet.model';
import {DossierProjetAdminService} from 'src/app/shared/service/admin/projet/DossierProjetAdmin.service';
import {ExigenceDto} from 'src/app/shared/model/exigence/Exigence.model';
import {ExigenceAdminService} from 'src/app/shared/service/admin/exigence/ExigenceAdmin.service';

@Component({
  selector: 'app-dossier-projet-document-edit-admin',
  templateUrl: './dossier-projet-document-edit-admin.component.html'
})
export class DossierProjetDocumentEditAdminComponent implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();


    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;
    private _file: any;
    private _files: any;

    protected dossierProjetExigenceAppliquesIndex = -1;

    private _dossierProjetExigenceAppliquesElement = new DossierProjetExigenceAppliqueDto();

    private _validDossierProjetDocumentCode = true;
    private _validDossierProjetDocumentLibelle = true;

    private _validDossierProjetCode = true;
    private _validDossierProjetLibelle = true;



    constructor(private service: DossierProjetDocumentAdminService , private dossierProjetExigenceEtatService: DossierProjetExigenceEtatAdminService, private dossierProjetExigenceAppliqueService: DossierProjetExigenceAppliqueAdminService, private dossierProjetService: DossierProjetAdminService, private exigenceService: ExigenceAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.dossierProjetExigenceAppliquesElement.exigence = new ExigenceDto();
        this.exigenceService.findAll().subscribe((data) => this.exigences = data);
        this.dossierProjetExigenceAppliquesElement.dossierProjetExigenceEtat = new DossierProjetExigenceEtatDto();
        this.dossierProjetExigenceEtatService.findAll().subscribe((data) => this.dossierProjetExigenceEtats = data);

        this.dossierProjetService.findAll().subscribe((data) => this.dossierProjets = data);
    }

    public prepareEdit() {
    }



 public edit(): void {
        this.submitted = true;
        this.prepareEdit();
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.service.edit().subscribe(religion=>{
            const myIndex = this.items.findIndex(e => e.id === this.item.id);
            this.items[myIndex] = religion;
            this.editDialog = false;
            this.submitted = false;
            this.item = new DossierProjetDocumentDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public validateDossierProjetExigenceAppliques(){
        this.errorMessages = new Array();
    }

    public setValidation(value: boolean){
        this.validDossierProjetDocumentCode = value;
        this.validDossierProjetDocumentLibelle = value;
    }

    public addDossierProjetExigenceAppliques() {
        if( this.item.dossierProjetExigenceAppliques == null )
            this.item.dossierProjetExigenceAppliques = new Array<DossierProjetExigenceAppliqueDto>();

       this.validateDossierProjetExigenceAppliques();

       if (this.errorMessages.length === 0) {
            if (this.dossierProjetExigenceAppliquesIndex == -1){
                this.item.dossierProjetExigenceAppliques.push({... this.dossierProjetExigenceAppliquesElement});
            }else {
                this.item.dossierProjetExigenceAppliques[this.dossierProjetExigenceAppliquesIndex] =this.dossierProjetExigenceAppliquesElement;
            }
              this.dossierProjetExigenceAppliquesElement = new DossierProjetExigenceAppliqueDto();
              this.dossierProjetExigenceAppliquesIndex = -1;
       }else{
           this.messageService.add({severity: 'error',summary: 'Erreurs',detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages});
       }
    }

    public deleteDossierProjetExigenceAppliques(p: DossierProjetExigenceAppliqueDto, index: number) {
        this.item.dossierProjetExigenceAppliques.splice(index, 1);
    }

    public editDossierProjetExigenceAppliques(p: DossierProjetExigenceAppliqueDto, index: number) {
        this.dossierProjetExigenceAppliquesElement = {... p};
        this.dossierProjetExigenceAppliquesIndex = index;
        this.activeTab = 0;
    }

    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateDossierProjetDocumentCode();
        this.validateDossierProjetDocumentLibelle();
    }

    public validateDossierProjetDocumentCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validDossierProjetDocumentCode = false;
        } else {
            this.validDossierProjetDocumentCode = true;
        }
    }

    public validateDossierProjetDocumentLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validDossierProjetDocumentLibelle = false;
        } else {
            this.validDossierProjetDocumentLibelle = true;
        }
    }




   public async openCreateDossierProjet(dossierProjet: string) {
        const isPermistted = await this.roleService.isPermitted('DossierProjet', 'edit');
        if (isPermistted) {
             this.dossierProjet = new DossierProjetDto();
             this.createDossierProjetDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }
   public async openCreateDossierProjetExigenceEtat(dossierProjetExigenceEtat: string) {
        const isPermistted = await this.roleService.isPermitted('DossierProjetExigenceEtat', 'edit');
        if (isPermistted) {
             this.dossierProjetExigenceEtat = new DossierProjetExigenceEtatDto();
             this.createDossierProjetExigenceEtatDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get dossierProjet(): DossierProjetDto {
        return this.dossierProjetService.item;
    }
    set dossierProjet(value: DossierProjetDto) {
        this.dossierProjetService.item = value;
    }
    get dossierProjets(): Array<DossierProjetDto> {
        return this.dossierProjetService.items;
    }
    set dossierProjets(value: Array<DossierProjetDto>) {
        this.dossierProjetService.items = value;
    }
    get createDossierProjetDialog(): boolean {
        return this.dossierProjetService.createDialog;
    }
    set createDossierProjetDialog(value: boolean) {
        this.dossierProjetService.createDialog= value;
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
    get dossierProjetExigenceEtat(): DossierProjetExigenceEtatDto {
        return this.dossierProjetExigenceEtatService.item;
    }
    set dossierProjetExigenceEtat(value: DossierProjetExigenceEtatDto) {
        this.dossierProjetExigenceEtatService.item = value;
    }
    get dossierProjetExigenceEtats(): Array<DossierProjetExigenceEtatDto> {
        return this.dossierProjetExigenceEtatService.items;
    }
    set dossierProjetExigenceEtats(value: Array<DossierProjetExigenceEtatDto>) {
        this.dossierProjetExigenceEtatService.items = value;
    }
    get createDossierProjetExigenceEtatDialog(): boolean {
        return this.dossierProjetExigenceEtatService.createDialog;
    }
    set createDossierProjetExigenceEtatDialog(value: boolean) {
        this.dossierProjetExigenceEtatService.createDialog= value;
    }

    get dossierProjetExigenceAppliquesElement(): DossierProjetExigenceAppliqueDto {
        if( this._dossierProjetExigenceAppliquesElement == null )
            this._dossierProjetExigenceAppliquesElement = new DossierProjetExigenceAppliqueDto();
         return this._dossierProjetExigenceAppliquesElement;
    }

    set dossierProjetExigenceAppliquesElement(value: DossierProjetExigenceAppliqueDto) {
        this._dossierProjetExigenceAppliquesElement = value;
    }

    get validDossierProjetDocumentCode(): boolean {
        return this._validDossierProjetDocumentCode;
    }
    set validDossierProjetDocumentCode(value: boolean) {
        this._validDossierProjetDocumentCode = value;
    }
    get validDossierProjetDocumentLibelle(): boolean {
        return this._validDossierProjetDocumentLibelle;
    }
    set validDossierProjetDocumentLibelle(value: boolean) {
        this._validDossierProjetDocumentLibelle = value;
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

	get items(): Array<DossierProjetDocumentDto> {
        return this.service.items;
    }

    set items(value: Array<DossierProjetDocumentDto>) {
        this.service.items = value;
    }

    get item(): DossierProjetDocumentDto {
        return this.service.item;
    }

    set item(value: DossierProjetDocumentDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): DossierProjetDocumentCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierProjetDocumentCriteria) {
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


}
