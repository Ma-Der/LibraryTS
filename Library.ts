import { Misc } from './Misc';
import { Booking } from './Booking';
import { Book } from './Book';
import { User } from './User';

export class Library {
    
    bookList: Book[];
    lendList: Booking[];
    lendedBookList: Book[];

    constructor() {
        this.bookList = [];
        this.lendList = [];
        this.lendedBookList = [];
    }

    addBook(...books: Book[]): void {
        books.forEach(book => {
            this.bookList.forEach(bookOnList => {if(bookOnList.id === book.id) throw new Error("This book is already in Library.")});
        });
        this.bookList.push(...books);
    }

    deleteBook(id: string): void {
        Misc.isStringValid(id);
        this.bookList = this.bookList.filter(bookOnList => id !== bookOnList.id);
    }

    private deleteLendedBook(id: string): void {
        Misc.isStringValid(id);
        this.lendedBookList = this.lendedBookList.filter(bookOnList => id !== bookOnList.id);
    }

    rentBook(user: User, ...books: Book[]): void {
        const rent = new Booking(user, ...books);
        this.lendedBookList.map(book => books.includes(book)).filter(el => el === true ? rent.rentBookInformation() : false);
        this.bookList.filter(book => {if(books.includes(book)) this.deleteBook(book.id)});
        this.lendList.push(rent);
        this.lendedBookList.push(...books);
    }

    returnBook(user: User, returnDate: Date, ...books: Book[]): void {
        const [rightBooking] = this.lendList.filter(booking => booking.user.id === user.id ? booking : false);
        const booksShouldBeReturned = rightBooking.books

        const returnedBooks = books.filter(book => booksShouldBeReturned.includes(book));
        if(!booksShouldBeReturned.every(book => returnedBooks.includes(book))) throw new Error("Not all books have been returned. Please bring all the books.");
        if(!books.every(book => returnedBooks.includes(book))) throw new Error("You didn't rent all this books.");
        returnedBooks.map(book => {
            this.addBook(book);
            this.deleteLendedBook(book.id);
        });
        rightBooking.returnBook(returnDate);
    }
}