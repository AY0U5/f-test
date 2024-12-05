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


import {ExigenceAdminService} from 'src/app/shared/service/admin/exigence/ExigenceAdmin.service';
import {ExigenceDto} from 'src/app/shared/model/exigence/Exigence.model';
import {ExigenceCriteria} from 'src/app/shared/criteria/exigence/ExigenceCriteria.model';

import {FamilleExigenceDto} from 'src/app/shared/model/exigence/FamilleExigence.model';
import {FamilleExigenceAdminService} from 'src/app/shared/service/admin/exigence/FamilleExigenceAdmin.service';
@Component({
  selector: 'app-exigence-view-admin',
  templateUrl: './exigence-view-admin.component.html'
})
export class ExigenceViewAdminComponent implements OnInit {


	protected _submitted = false;
    protected _errorMessages = new Array<string>();

    protected datePipe: DatePipe;
    protected messageService: MessageService;
    protected confirmationService: ConfirmationService;
    protected roleService: RoleService;
    protected router: Router;
    protected stringUtilService: StringUtilService;



    constructor(private service: ExigenceAdminService, private familleExigenceService: FamilleExigenceAdminService){
		this.datePipe = ServiceLocator.injector.get(DatePipe);
        this.messageService = ServiceLocator.injector.get(MessageService);
        this.confirmationService = ServiceLocator.injector.get(ConfirmationService);
        this.roleService = ServiceLocator.injector.get(RoleService);
        this.router = ServiceLocator.injector.get(Router);
        this.stringUtilService = ServiceLocator.injector.get(StringUtilService);
	}

    ngOnInit(): void {
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

    public hideViewDialog() {
        this.viewDialog = false;
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

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get criteria(): ExigenceCriteria {
        return this.service.criteria;
    }

    set criteria(value: ExigenceCriteria) {
        this.service.criteria = value;
    }

    get dateFormat(){
        return environment.dateFormatView;
    }

    get dateFormatColumn(){
        return environment.dateFormatList;
    }


}
