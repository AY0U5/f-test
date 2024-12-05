import {DossierProjetDocumentCriteria} from './DossierProjetDocumentCriteria.model';
import {DossierProjetExigenceEtatCriteria} from './DossierProjetExigenceEtatCriteria.model';
import {ExigenceCriteria} from '../exigence/ExigenceCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class DossierProjetExigenceAppliqueCriteria extends BaseCriteria {

    public id: number;
    public commentaire: string;
    public commentaireLike: string;
     public tauxPrecision: number;
     public tauxPrecisionMin: number;
     public tauxPrecisionMax: number;
    public pages: string;
    public pagesLike: string;

}
