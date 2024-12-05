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


import {ReferentielFamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/ReferentielFamilleExigenceAdmin.service';
import {ReferentielFamilleExigenceDto} from 'src/app/shared/model/exigence/ReferentielFamilleExigence.model';
import {ReferentielFamilleExigenceCriteria} from 'src/app/shared/criteria/exigence/ReferentielFamilleExigenceCriteria.model';

@Component({
  selector: 'app-referentiel-famille-exigence-view-admin',
  templateUrl: './referentiel-famille-exigence-view-admin.component.html'
})
export class ReferentielFamilleExigenceViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: ReferentielFamilleExigenceAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
    }



    public hideViewDialog() {
        this.viewDialog = false;
    }

    get items(): Array<ReferentielFamilleExigenceDto> {
        return this.service.items;
    }

    set items(value: Array<ReferentielFamilleExigenceDto>) {
        this.service.items = value;
    }

    get item(): ReferentielFamilleExigenceDto {
        return this.service.item;
    }

    set item(value: ReferentielFamilleExigenceDto) {
        this.service.item = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ReferentielFamilleExigenceCriteria {
        return this.service.criteria;
    }

    set criteria(value: ReferentielFamilleExigenceCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
