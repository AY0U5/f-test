import {FamilleExigenceCriteria} from './FamilleExigenceCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class ExigenceCriteria extends BaseCriteria {

    public id: number;
    public reference: string;
    public referenceLike: string;
    public libelle: string;
    public libelleLike: string;
    public description: string;
    public descriptionLike: string;
  public familleExigence: FamilleExigenceCriteria ;
  public familleExigences: Array<FamilleExigenceCriteria> ;

}
