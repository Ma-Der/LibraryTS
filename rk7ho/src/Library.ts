import { Misc } from "./Misc";
import { IBooking, Booking } from "./Booking";
import { IBook } from "./Book";
import { IUser } from "./User";

interface ILibrary {
  userList: IUser[];
  bookList: IBook[];
  lendList: IBooking[];
  _lendedBookList: IBook[];
  addBook(...books: IBook[]): void;
  addUser(user: IUser): void;
  deleteBook(id: string): void;
  _deleteLendedBook(id: string): void;
  rentBook(user: IUser, ...books: IBook[]): void;
  returnBook(user: IUser, returnDate: Date, ...books: IBook[]): void;
}

export class Library implements ILibrary {
  userList: IUser[];
  bookList: IBook[];
  lendList: IBooking[];
  _lendedBookList: IBook[];

  constructor() {
    this.userList = [];
    this.bookList = [];
    this.lendList = [];
    this._lendedBookList = [];
  }

  addBook(...books: IBook[]): void {
    books.forEach((book) => {
      this.bookList.forEach((bookOnList) => {
        if (bookOnList.id === book.id)
          throw new Error("This book is already in Library.");
      });
    });
    this.bookList.push(...books);
  }

  addUser(user: IUser): void {
    if (Misc.isUserExist(user, this.userList))
      throw new Error("User already exists.");
    this.userList.push(user);
  }

  deleteBook(book: IBook): void {
    Misc.isBookAvailable(this.bookList, book);
    this.bookList = this.bookList.filter(
      (bookOnList) => book.id !== bookOnList.id
    );
  }

  _deleteLendedBook(book: IBook): void {
    Misc.isBookAvailable(this._lendedBookList, book);
    this._lendedBookList = this._lendedBookList.filter(
      (bookOnList) => book.id !== bookOnList.id
    );
  }

  rentBook(user: IUser, ...books: IBook[]): void {
    Misc.isBookAvailable(this.bookList, ...books);
    Misc.isBookAvailable(this._lendedBookList, ...books);
    if (!Misc.isUserExist(user, this.userList))
      throw new Error("User does not exist in this library.");

    const rent = new Booking(user, ...books);

    this.bookList.filter((book) => {
      if (books.includes(book)) this.deleteBook(book);
      return false;
    });
    this.lendList.push(rent);
    this._lendedBookList.push(...books);
  }

  returnBook(user: IUser, returnDate: Date, ...books: IBook[]): void {
    if (!Misc.isUserExist(user, this.userList))
      throw new Error("User does not exist in this library.");

    const [rightBooking] = this.lendList.filter(
      (booking) => booking.user.id === user.id
    );

    if (rightBooking.lendDate > returnDate) {
      throw new Error("Return date cannot be less than lend date.");
    }
    const booksShouldBeReturned = rightBooking.books;

    const returnedBooks = books.filter((book) =>
      booksShouldBeReturned.includes(book)
    );
    if (!booksShouldBeReturned.every((book) => returnedBooks.includes(book)))
      throw new Error(
        "Not all books have been returned. Please bring all the books."
      );
    if (!books.every((book) => returnedBooks.includes(book)))
      throw new Error("You didn't rent all this books.");

    returnedBooks.forEach((book) => {
      this._deleteLendedBook(book);
      this.addBook(book);
    });

    rightBooking.returnBook(returnDate);
  }
}
