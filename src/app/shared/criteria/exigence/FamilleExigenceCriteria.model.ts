import {ReferentielFamilleExigenceCriteria} from './ReferentielFamilleExigenceCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class FamilleExigenceCriteria extends BaseCriteria {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;
    public style: string;
    public styleLike: string;
  public referentielFamilleExigence: ReferentielFamilleExigenceCriteria ;
  public referentielFamilleExigences: Array<ReferentielFamilleExigenceCriteria> ;

}
