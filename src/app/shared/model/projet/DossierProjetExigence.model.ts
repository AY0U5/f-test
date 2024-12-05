import {DossierProjetDto} from './DossierProjet.model';
import {ExigenceDto} from '../exigence/Exigence.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class DossierProjetExigenceDto extends BaseDto{

    public commentaire: string;

   public enabled: null | boolean;

    public exigence: ExigenceDto ;
    public dossierProjet: DossierProjetDto ;


    constructor() {
        super();

        this.commentaire = '';
        this.enabled = null;

        }

}
