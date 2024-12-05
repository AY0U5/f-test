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
  selector: 'app-dossier-projet-document-view-admin',
  templateUrl: './dossier-projet-document-view-admin.component.html'
})
export class DossierProjetDocumentViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;


    dossierProjetExigenceAppliques = new DossierProjetExigenceAppliqueDto();
    dossierProjetExigenceAppliquess: Array<DossierProjetExigenceAppliqueDto> = [];

    constructor(private service: DossierProjetDocumentAdminService, private dossierProjetExigenceEtatService: DossierProjetExigenceEtatAdminService, private dossierProjetExigenceAppliqueService: DossierProjetExigenceAppliqueAdminService, private dossierProjetService: DossierProjetAdminService, private exigenceService: ExigenceAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): DossierProjetDocumentCriteria {
        return this.service.criteria;
    }

    set criteria(value: DossierProjetDocumentCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
