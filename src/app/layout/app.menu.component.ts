import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {RoleService} from "../zynerator/security/shared/service/Role.service";
import {AppComponent} from "../app.component";
import {AuthService} from "../zynerator/security/shared/service/Auth.service";
import {Router} from "@angular/router";
import {AppLayoutComponent} from "./app.layout.component";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelanonymous: any[];
    modelAdmin: any[];
constructor(public layoutService: LayoutService, public app: AppComponent, public appMain: AppLayoutComponent, private roleService: RoleService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.modelAdmin =
      [

				{
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
					  {
						label: 'Projet Management',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste dossier projet',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/projet/dossier-projet/list']
								  },
								  {
									label: 'Liste dossier projet exigence etat',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/projet/dossier-projet-exigence-etat/list']
								  },
								  {
									label: 'Liste dossier projet document',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/projet/dossier-projet-document/list']
								  },
						]
					  },
					  {
						label: 'Exigence Management',
						icon: 'pi pi-wallet',
						items: [
							{
								label: 'Liste exigence',
								icon: 'pi pi-fw pi-plus-circle',
								routerLink: ['/app/admin/exigence/exigence/list']
							  },
						
								  {
									label: 'Liste famille exigence',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/exigence/famille-exigence/list']
								  },

								  {
									label: 'Liste referentiel famille exigence',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/exigence/referentiel-famille-exigence/list']
								  }
								  
						]
					  },

				   {
					  label: 'Security Management',
					  icon: 'pi pi-wallet',
					  items: [
						  {
							  label: 'List User',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/user/list']
						  },
						  {
							  label: 'List Model',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/model-permission/list']
						  },
						  {
							  label: 'List Action Permission',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/action-permission/list']
						  },
					  ]
				  }
			]
	    }
    ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roleUsers) {
              this.authService.authenticatedUser.roleUsers.forEach(role => {
                  const roleName: string = this.getRole(role.role.authority);
                  this.roleService._role.next(roleName.toUpperCase());
                  eval('this.model = this.model' + this.getRole(role.role.authority));
              })
            }
        }
  }

    getRole(text){
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
      if (!word) { return word; }
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
