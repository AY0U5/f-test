import {ReferentielFamilleExigenceDto} from './ReferentielFamilleExigence.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class FamilleExigenceDto extends BaseDto{

    public code: string;

    public libelle: string;

    public style: string;

    public referentielFamilleExigence: ReferentielFamilleExigenceDto ;


    constructor() {
        super();

        this.code = '';
        this.libelle = '';
        this.style = '';
        this.referentielFamilleExigence = new ReferentielFamilleExigenceDto() ;

        }

}
