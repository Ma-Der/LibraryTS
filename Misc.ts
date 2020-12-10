import { IBook } from "./Book";
import { IUser } from "./User";

interface pics {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

export class Misc {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static randomPic(): string {
    const images: pics = {
      img1: "../img/01.jpg",
      img2: "../img/02.jpg",
      img3: "../img/03.jpg",
      img4: "../img/04.jpg",
      img5: "../img/05.jpg"
    };
    const value = Object.values(images);
    const randomNum = Math.floor(Math.random() * 5);
    return value[randomNum];
  }

  static isStringEmpty(str: string): void {
    if (str.length === 0) throw new Error("Empty string.");
  }

  static isBookAvailable(list: IBook[], ...books: IBook[]): void {
    list
      .filter((book) => books.includes(book))
      .forEach((el) => {
        if (!el) {
          throw new Error(`This book is unavailable in our library.`);
        }
        return false;
      });
  }

  static isUserExist(user: IUser, list: IUser[]): boolean {
    return list.some((usrOnList) => user.id === usrOnList.id);
  }
}

