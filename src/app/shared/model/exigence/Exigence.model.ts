import {FamilleExigenceDto} from './FamilleExigence.model';

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';


export class ExigenceDto extends BaseDto{

    public reference: string;

    public libelle: string;

    public description: string;

    public familleExigence: FamilleExigenceDto ;


    constructor() {
        super();

        this.reference = '';
        this.libelle = '';
        this.description = '';
        this.familleExigence = new FamilleExigenceDto() ;

        }

}
