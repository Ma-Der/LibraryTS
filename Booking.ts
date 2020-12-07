import { Misc } from './Misc';
import { User } from './User';
import { Book } from './Book';

export class Booking {

    user: User;
    books: Book[];
    lendDate: Date;
    returnDate: Date;
    penalty: number;

    constructor(user: User, ...books: Book[]) {
        this.user = user;
        this.books = [...books];
        this.lendDate = new Date();
        this.returnDate = Misc.addDays(this.lendDate, 7);       
        this.penalty = 0;
    }

    setPenalty(returnDate: Date): void {
        const result = (Date.parse(returnDate.toString()) - Date.parse(this.lendDate.toString())) / (1000*60*60*24);
        const daysWithoutPenalty = 7;
        const penaltyValue = 10;
        let penalty = 0;
        if(result > daysWithoutPenalty) {
            let penaltyDays = result - daysWithoutPenalty;
            penalty = penaltyValue;
            for(let i = 1; i < penaltyDays; i++) {
               penalty += penaltyValue;
            }        
        }
        this.penalty = penalty * this.books.length;
        if(penalty > 0) console.log(`${this.user.name} need to pay a penalty of ${this.penalty} PLN.`);
    }

    rentBookInformation(): void { 
        throw new Error(`Currently this book is unavailable in our library.`);
    }
    
    returnBook(returnDate: Date): void {
        this.setPenalty(returnDate);
    }
}