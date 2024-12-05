import {DossierProjetExigenceAppliqueDto} from './DossierProjetExigenceApplique.model';
import {DossierProjetDto} from './DossierProjet.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class DossierProjetDocumentDto extends BaseDto{

    public code: string;

    public libelle: string;

    public path: string;

    public content: string;

    public dossierProjet: DossierProjetDto ;
     public dossierProjetExigenceAppliques: Array<DossierProjetExigenceAppliqueDto>;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.path = '';
        this.content = '';
        this.dossierProjet = new DossierProjetDto() ;
        this.dossierProjetExigenceAppliques = new Array<DossierProjetExigenceAppliqueDto>();

        }

}
