import { Misc } from "./Misc";
import { v4 as uuidv4 } from "uuid";

export interface IBook {
  id: string;
  title: string;
  author: string;
  picture: string;
  description: string;
}

export class Book implements IBook {
  id: string;
  title: string;
  author: string;
  picture: string;
  description: string;

  constructor(title: string, author: string, description: string) {
    Misc.isStringEmpty(title);
    Misc.isStringEmpty(author);
    Misc.isStringEmpty(description);
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.picture = Misc.randomPic();
    this.description = description;
  }
}
