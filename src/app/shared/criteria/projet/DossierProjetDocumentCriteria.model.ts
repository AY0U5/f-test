import {DossierProjetExigenceAppliqueCriteria} from './DossierProjetExigenceAppliqueCriteria.model';
import {DossierProjetCriteria} from './DossierProjetCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class DossierProjetDocumentCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public path: string;
    public pathLike: string;
    public content: string;
    public contentLike: string;
  public dossierProjet: DossierProjetCriteria ;
  public dossierProjets: Array<DossierProjetCriteria> ;
      public dossierProjetExigenceAppliques: Array<DossierProjetExigenceAppliqueCriteria>;

}
