import { v4 as uuidv4 } from 'uuid';
import { Misc } from './Misc';

export class User {
    
    id: string;
    name: string;

    constructor(name: string) {
        Misc.isStringValid(name);
        this.id = uuidv4();
        this.name = name;
    }
}