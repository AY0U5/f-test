import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';


import {environment} from 'src/environments/environment';

import {RoleService} from 'src/app/zynerator/security/shared/service/Role.service';
import {AbstractService} from 'src/app/zynerator/service/AbstractService';
import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';
import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {StringUtilService} from 'src/app/zynerator/util/StringUtil.service';
import {ServiceLocator} from 'src/app/zynerator/service/ServiceLocator';
import {ConfirmationService, MessageService,MenuItem} from 'primeng/api';
import {FileTempDto} from 'src/app/zynerator/dto/FileTempDto.model';


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
  selector: 'app-dossier-projet-view-admin',
  templateUrl: './dossier-projet-view-admin.component.html'
})
export class DossierProjetViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    dossierProjetExigences = new DossierProjetExigenceDto();
    dossierProjetExigencess: Array<DossierProjetExigenceDto> = [];
    dossierProjetDocuments = new DossierProjetDocumentDto();
    dossierProjetDocumentss: Array<DossierProjetDocumentDto> = [];

    constructor(private service: DossierProjetAdminService, private dossierProjetDocumentService: DossierProjetDocumentAdminService, private dossierProjetExigenceService: DossierProjetExigenceAdminService, private exigenceService: ExigenceAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): DossierProjetCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierProjetCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
