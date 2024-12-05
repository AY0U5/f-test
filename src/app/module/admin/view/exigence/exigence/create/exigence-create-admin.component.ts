import {Component, OnInit, Input} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';




import {ExigenceAdminService} from 'src/app/shared/service/admin/exigence/ExigenceAdmin.service';
import {ExigenceDto} from 'src/app/shared/model/exigence/Exigence.model';
import {ExigenceCriteria} from 'src/app/shared/criteria/exigence/ExigenceCriteria.model';
import {FamilleExigenceDto} from 'src/app/shared/model/exigence/FamilleExigence.model';
import {FamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/FamilleExigenceAdmin.service';
@Component({
  selector: 'app-exigence-create-admin',
  templateUrl: './exigence-create-admin.component.html'
})
export class ExigenceCreateAdminComponent  implements OnInit {

	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;
    private _activeTab = 0;



   private _validExigenceReference = true;
   private _validExigenceLibelle = true;
    private _validFamilleExigenceCode = true;
    private _validFamilleExigenceLibelle = true;
    private _validFamilleExigenceStyle = true;

	constructor(private service: ExigenceAdminService , private familleExigenceService: FamilleExigenceAdminService, @Inject(PLATFORM_ID) private platformId? ) {
        this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
    }

    ngOnInit(): void {
        this.familleExigenceService.findAll().subscribe((data) => this.familleExigences = data);
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
                this.item = new ExigenceDto();
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





    public  setValidation(value: boolean){
        this.validExigenceReference = value;
        this.validExigenceLibelle = value;
    }



    public  validateForm(): void{
        this.errorMessages = new Array<string>();
        this.validateExigenceReference();
        this.validateExigenceLibelle();
    }

    public validateExigenceReference(){
        if (this.stringUtilService.isEmpty(this.item.reference)) {
        this.errorMessages.push('Reference non valide');
        this.validExigenceReference = false;
        } else {
            this.validExigenceReference = true;
        }
    }
    public validateExigenceLibelle(){
        if (this.stringUtilService.isEmpty(this.item.libelle)) {
        this.errorMessages.push('Libelle non valide');
        this.validExigenceLibelle = false;
        } else {
            this.validExigenceLibelle = true;
        }
    }


    public async openCreateFamilleExigence(familleExigence: string) {
    const isPermistted = await this.roleService.isPermitted('FamilleExigence', 'add');
    if(isPermistted) {
         this.familleExigence = new FamilleExigenceDto();
         this.createFamilleExigenceDialog = true;
    }else{
        this.messageService.add({
        severity: 'error', summary: 'erreur', detail: 'problème de permission'
        });
     }
    }

    get familleExigence(): FamilleExigenceDto {
        return this.familleExigenceService.item;
    }
    set familleExigence(value: FamilleExigenceDto) {
        this.familleExigenceService.item = value;
    }
    get familleExigences(): Array<FamilleExigenceDto> {
        return this.familleExigenceService.items;
    }
    set familleExigences(value: Array<FamilleExigenceDto>) {
        this.familleExigenceService.items = value;
    }
    get createFamilleExigenceDialog(): boolean {
        return this.familleExigenceService.createDialog;
    }
    set createFamilleExigenceDialog(value: boolean) {
        this.familleExigenceService.createDialog= value;
    }



    get validExigenceReference(): boolean {
        return this._validExigenceReference;
    }

    set validExigenceReference(value: boolean) {
         this._validExigenceReference = value;
    }
    get validExigenceLibelle(): boolean {
        return this._validExigenceLibelle;
    }

    set validExigenceLibelle(value: boolean) {
         this._validExigenceLibelle = value;
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


    get items(): Array<ExigenceDto> {
        return this.service.items;
    }

    set items(value: Array<ExigenceDto>) {
        this.service.items = value;
    }

    get item(): ExigenceDto {
        return this.service.item;
    }

    set item(value: ExigenceDto) {
        this.service.item = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get criteria(): ExigenceCriteria {
        return this.service.criteria;
    }

    set criteria(value: ExigenceCriteria) {
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
