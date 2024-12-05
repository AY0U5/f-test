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




import {FamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/FamilleExigenceAdmin.service';
import {FamilleExigenceDto} from 'src/app/shared/model/exigence/FamilleExigence.model';
import {FamilleExigenceCriteria} from 'src/app/shared/criteria/exigence/FamilleExigenceCriteria.model';


import {ReferentielFamilleExigenceDto} from 'src/app/shared/model/exigence/ReferentielFamilleExigence.model';
import {ReferentielFamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/ReferentielFamilleExigenceAdmin.service';

@Component({
  selector: 'app-famille-exigence-edit-admin',
  templateUrl: './famille-exigence-edit-admin.component.html'
})
export class FamilleExigenceEditAdminComponent implements OnInit {

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



    private _validFamilleExigenceCode = true;
    private _validFamilleExigenceLibelle = true;
    private _validFamilleExigenceStyle = true;

    private _validReferentielFamilleExigenceCode = true;
    private _validReferentielFamilleExigenceLibelle = true;
    private _validReferentielFamilleExigenceStyle = true;



    constructor(private service: FamilleExigenceAdminService , private referentielFamilleExigenceService: ReferentielFamilleExigenceAdminService, @Inject(PLATFORM_ID) private platformId?) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.referentielFamilleExigenceService.findAll().subscribe((data) => this.referentielFamilleExigences = data);
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
            this.item = new FamilleExigenceDto();
        } , error =>{
            console.log(error);
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
        this.setValidation(true);
    }





    public setValidation(value: boolean){
        this.validFamilleExigenceCode = value;
        this.validFamilleExigenceLibelle = value;
        this.validFamilleExigenceStyle = value;
    }


    public validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateFamilleExigenceCode();
        this.validateFamilleExigenceLibelle();
        this.validateFamilleExigenceStyle();
    }

    public validateFamilleExigenceCode(){
        if (this.stringUtilService.isEmpty(this.item.code)) {
            this.errorMessages.push('Code non valide');
            this.validFamilleExigenceCode = false;
        } else {
            this.validFamilleExigenceCode = true;
        }
    }

    public validateFamilleExigenceLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFamilleExigenceLibelle = false;
        } else {
            this.validFamilleExigenceLibelle = true;
        }
    }

    public validateFamilleExigenceStyle(){
        if (this.stringUtilService.isEmpty(this.item.style)) {
            this.errorMessages.push('Style non valide');
            this.validFamilleExigenceStyle = false;
        } else {
            this.validFamilleExigenceStyle = true;
        }
    }




   public async openCreateReferentielFamilleExigence(referentielFamilleExigence: string) {
        const isPermistted = await this.roleService.isPermitted('ReferentielFamilleExigence', 'edit');
        if (isPermistted) {
             this.referentielFamilleExigence = new ReferentielFamilleExigenceDto();
             this.createReferentielFamilleExigenceDialog = true;
        }else {
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    get referentielFamilleExigence(): ReferentielFamilleExigenceDto {
        return this.referentielFamilleExigenceService.item;
    }
    set referentielFamilleExigence(value: ReferentielFamilleExigenceDto) {
        this.referentielFamilleExigenceService.item = value;
    }
    get referentielFamilleExigences(): Array<ReferentielFamilleExigenceDto> {
        return this.referentielFamilleExigenceService.items;
    }
    set referentielFamilleExigences(value: Array<ReferentielFamilleExigenceDto>) {
        this.referentielFamilleExigenceService.items = value;
    }
    get createReferentielFamilleExigenceDialog(): boolean {
        return this.referentielFamilleExigenceService.createDialog;
    }
    set createReferentielFamilleExigenceDialog(value: boolean) {
        this.referentielFamilleExigenceService.createDialog= value;
    }


    get validFamilleExigenceCode(): boolean {
        return this._validFamilleExigenceCode;
    }
    set validFamilleExigenceCode(value: boolean) {
        this._validFamilleExigenceCode = value;
    }
    get validFamilleExigenceLibelle(): boolean {
        return this._validFamilleExigenceLibelle;
    }
    set validFamilleExigenceLibelle(value: boolean) {
        this._validFamilleExigenceLibelle = value;
    }
    get validFamilleExigenceStyle(): boolean {
        return this._validFamilleExigenceStyle;
    }
    set validFamilleExigenceStyle(value: boolean) {
        this._validFamilleExigenceStyle = value;
    }

    get validReferentielFamilleExigenceCode(): boolean {
        return this._validReferentielFamilleExigenceCode;
    }
    set validReferentielFamilleExigenceCode(value: boolean) {
        this._validReferentielFamilleExigenceCode = value;
    }
    get validReferentielFamilleExigenceLibelle(): boolean {
        return this._validReferentielFamilleExigenceLibelle;
    }
    set validReferentielFamilleExigenceLibelle(value: boolean) {
        this._validReferentielFamilleExigenceLibelle = value;
    }
    get validReferentielFamilleExigenceStyle(): boolean {
        return this._validReferentielFamilleExigenceStyle;
    }
    set validReferentielFamilleExigenceStyle(value: boolean) {
        this._validReferentielFamilleExigenceStyle = value;
    }

	get items(): Array<FamilleExigenceDto> {
        return this.service.items;
    }

    set items(value: Array<FamilleExigenceDto>) {
        this.service.items = value;
    }

    get item(): FamilleExigenceDto {
        return this.service.item;
    }

    set item(value: FamilleExigenceDto) {
        this.service.item = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get criteria(): FamilleExigenceCriteria {
        return this.service.criteria;
    }

    set criteria(value: FamilleExigenceCriteria) {
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
