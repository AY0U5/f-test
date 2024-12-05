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


import {FamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/FamilleExigenceAdmin.service';
import {FamilleExigenceDto} from 'src/app/shared/model/exigence/FamilleExigence.model';
import {FamilleExigenceCriteria} from 'src/app/shared/criteria/exigence/FamilleExigenceCriteria.model';

import {ReferentielFamilleExigenceDto} from 'src/app/shared/model/exigence/ReferentielFamilleExigence.model';
import {ReferentielFamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/ReferentielFamilleExigenceAdmin.service';
@Component({
  selector: 'app-famille-exigence-view-admin',
  templateUrl: './famille-exigence-view-admin.component.html'
})
export class FamilleExigenceViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: FamilleExigenceAdminService, private referentielFamilleExigenceService: ReferentielFamilleExigenceAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): FamilleExigenceCriteria {
        return this.service.criteria;
    }

    set criteria(value: FamilleExigenceCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
