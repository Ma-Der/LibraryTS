import { v4 as uuidv4 } from "uuid";
import { Misc } from "./Misc";

export interface IUser {
  id: string;
  name: string;
}

export class User implements IUser {
  id: string;
  name: string;

  constructor(name: string) {
    Misc.isStringEmpty(name);
    this.id = uuidv4();
    this.name = name;
  }
}
