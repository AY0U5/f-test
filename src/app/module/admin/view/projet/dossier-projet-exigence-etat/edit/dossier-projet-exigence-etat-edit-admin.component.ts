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




import {DossierProjetExigenceEtatAdminService} from 'src/app/shared/service/admin/projet/DossierProjetExigenceEtatAdmin.service';
import {DossierProjetExigenceEtatDto} from 'src/app/shared/model/projet/DossierProjetExigenceEtat.model';
import {DossierProjetExigenceEtatCriteria} from 'src/app/shared/criteria/projet/DossierProjetExigenceEtatCriteria.model';



@Component({
  selector: 'app-dossier-projet-exigence-etat-edit-admin',
  templateUrl: './dossier-projet-exigence-etat-edit-admin.component.html'
})
export class DossierProjetExigenceEtatEditAdminComponent implements OnInit {

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



    private _validDossierProjetExigenceEtatCode = true;
    private _validDossierProjetExigenceEtatLibelle = true;
    private _validDossierProjetExigenceEtatStyle = true;




    constructor(private service: DossierProjetExigenceEtatAdminService , @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
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
            this.item = new DossierProjetExigenceEtatDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validDossierProjetExigenceEtatCode = value;
        this.validDossierProjetExigenceEtatLibelle = value;
        this.validDossierProjetExigenceEtatStyle = value;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateDossierProjetExigenceEtatCode();
        this.validateDossierProjetExigenceEtatLibelle();
        this.validateDossierProjetExigenceEtatStyle();
    }

    public validateDossierProjetExigenceEtatCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validDossierProjetExigenceEtatCode = false;
        } else {
            this.validDossierProjetExigenceEtatCode = true;
        }
    }

    public validateDossierProjetExigenceEtatLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validDossierProjetExigenceEtatLibelle = false;
        } else {
            this.validDossierProjetExigenceEtatLibelle = true;
        }
    }

    public validateDossierProjetExigenceEtatStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validDossierProjetExigenceEtatStyle = false;
        } else {
            this.validDossierProjetExigenceEtatStyle = true;
        }
    }







    get validDossierProjetExigenceEtatCode(): boolean {
        return this._validDossierProjetExigenceEtatCode;
    }
    set validDossierProjetExigenceEtatCode(value: boolean) {
        this._validDossierProjetExigenceEtatCode = value;
    }
    get validDossierProjetExigenceEtatLibelle(): boolean {
        return this._validDossierProjetExigenceEtatLibelle;
    }
    set validDossierProjetExigenceEtatLibelle(value: boolean) {
        this._validDossierProjetExigenceEtatLibelle = value;
    }
    get validDossierProjetExigenceEtatStyle(): boolean {
        return this._validDossierProjetExigenceEtatStyle;
    }
    set validDossierProjetExigenceEtatStyle(value: boolean) {
        this._validDossierProjetExigenceEtatStyle = value;
    }


	get items(): Array<DossierProjetExigenceEtatDto> {
        return this.service.items;
    }

    set items(value: Array<DossierProjetExigenceEtatDto>) {
        this.service.items = value;
    }

    get item(): DossierProjetExigenceEtatDto {
        return this.service.item;
    }

    set item(value: DossierProjetExigenceEtatDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): DossierProjetExigenceEtatCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierProjetExigenceEtatCriteria) {
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
