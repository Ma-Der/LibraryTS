import { Misc } from "./Misc";
import { IUser } from "./User";
import { IBook } from "./Book";

export interface IBooking {
  user: IUser;
  books: IBook[];
  lendDate: Date;
  returnDate: Date;
  penalty: number;
  setPenalty(returnDate: Date): number;
  returnBook(returnDate: Date): string;
}

export class Booking implements IBooking {
  user: IUser;
  books: IBook[];
  lendDate: Date;
  returnDate: Date;
  penalty: number;

  constructor(user: IUser, ...books: IBook[]) {
    this.user = user;
    this.books = [...books];
    this.lendDate = new Date();
    this.returnDate = Misc.addDays(this.lendDate, 7);
    this.penalty = 0;
  }

  setPenalty(returnDate: Date): number {
    const dayLengthInMilliseconds = 1000 * 60 * 60 * 24;
    const result = (Date.parse(returnDate.toString()) - Date.parse(this.lendDate.toString())) / dayLengthInMilliseconds;
    const daysWithoutPenalty = 7;
    const penaltyValue = 10;
    let penalty = 0;
    if (result > daysWithoutPenalty) {
      let penaltyDays = result - daysWithoutPenalty;
      penalty = penaltyValue;
      for (let i = 1; i < penaltyDays; i++) {
        penalty += penaltyValue;
      }
    }
    this.penalty = penalty * this.books.length;
    return penalty;
  }

  returnBook(returnDate: Date): string {
    this.returnDate = returnDate;
    const penalty = this.setPenalty(returnDate);
    if (penalty > 0)
      console.log(
        `${this.user.name} need to pay a penalty of ${this.penalty} PLN.`
      );
      return `${this.user.name} need to pay a penalty of ${this.penalty} PLN.`;
  }
}