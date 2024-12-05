import {DossierProjetDocumentDto} from './DossierProjetDocument.model';
import {DossierProjetExigenceDto} from './DossierProjetExigence.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class DossierProjetDto extends BaseDto{

    public code: string;

    public libelle: string;

    public description: string;

     public dossierProjetExigences: Array<DossierProjetExigenceDto>;
     public dossierProjetDocuments: Array<DossierProjetDocumentDto>;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.description = '';
        this.dossierProjetExigences = new Array<DossierProjetExigenceDto>();
        this.dossierProjetDocuments = new Array<DossierProjetDocumentDto>();

        }

}
