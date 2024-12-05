import {DossierProjetDocumentDto} from './DossierProjetDocument.model';
import {DossierProjetExigenceEtatDto} from './DossierProjetExigenceEtat.model';
import {ExigenceDto} from '../exigence/Exigence.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class DossierProjetExigenceAppliqueDto extends BaseDto{

    public commentaire: string;

    public tauxPrecision: null | number;

    public pages: string;

    public dossierProjetDocument: DossierProjetDocumentDto ;
    public exigence: ExigenceDto ;
    public dossierProjetExigenceEtat: DossierProjetExigenceEtatDto ;


    constructor() {
        super();

        this.commentaire = '';
        this.tauxPrecision = null;
        this.pages = '';

        }

}
