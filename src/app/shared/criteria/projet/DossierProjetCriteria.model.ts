import {DossierProjetDocumentCriteria} from './DossierProjetDocumentCriteria.model';
import {DossierProjetExigenceCriteria} from './DossierProjetExigenceCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class DossierProjetCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
      public dossierProjetExigences: Array<DossierProjetExigenceCriteria>;
      public dossierProjetDocuments: Array<DossierProjetDocumentCriteria>;

}
