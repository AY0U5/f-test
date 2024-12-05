import {DossierProjetCriteria} from './DossierProjetCriteria.model';
import {ExigenceCriteria} from '../exigence/ExigenceCriteria.model';

import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class DossierProjetExigenceCriteria extends BaseCriteria {

    public id: number;
    public commentaire: string;
    public commentaireLike: string;
    public enabled: null | boolean;

}
