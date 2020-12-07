import { Misc } from './Misc';
import { v4 as uuidv4 } from 'uuid';

export class Book {

    id: string;
    title: string;
    author: string;
    picture: string;
    description: string;

    constructor(title: string, author: string, description: string) {
        Misc.isStringValid(title);
        Misc.isStringValid(author);
        Misc.isStringValid(description);
        this.id = uuidv4();
        this.title = title;
        this.author = author;
        this.picture = Misc.randomPic();
        this.description = description;
    }
}