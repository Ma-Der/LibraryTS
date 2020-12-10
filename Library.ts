import { Misc } from "./Misc";
import { IBooking, Booking } from "./Booking";
import { IBook } from "./Book";
import { IUser } from "./User";

interface ILibrary {
  userList: IUser[];
  bookList: IBook[];
  lendList: IBooking[];
  lendedBookList: IBook[];
  addBook(...books: IBook[]): void;
  addUser(user: IUser): void;
  deleteBook(id: string): void;
  deleteLendedBook(id: string): void;
  rentBook(user: IUser, ...books: IBook[]): void;
  returnBook(user: IUser, returnDate: Date, ...books: IBook[]): void;
}

export class Library implements ILibrary {
  userList: IUser[];
  bookList: IBook[];
  lendList: IBooking[];
  lendedBookList: IBook[];

  constructor() {
    this.userList = [];
    this.bookList = [];
    this.lendList = [];
    this.lendedBookList = [];
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

  deleteBook(id: string): void {
    Misc.isStringEmpty(id);
    this.bookList = this.bookList.filter((bookOnList) => id !== bookOnList.id);
  }

  deleteLendedBook(id: string): void {
    Misc.isStringEmpty(id);
    this.lendedBookList = this.lendedBookList.filter(
      (bookOnList) => id !== bookOnList.id
    );
  }

  rentBook(user: IUser, ...books: IBook[]): void {
    Misc.isBookAvailable(this.bookList, ...books);
    Misc.isBookAvailable(this.lendedBookList, ...books);
    if (!Misc.isUserExist(user, this.userList))
      throw new Error("User does not exist in this library.");

    const rent = new Booking(user, ...books);

    this.bookList.filter((book) => {
      if (books.includes(book)) this.deleteBook(book.id);
      return false;
    });
    this.lendList.push(rent);
    this.lendedBookList.push(...books);
  }

  returnBook(user: IUser, returnDate: Date, ...books: IBook[]): void {
    if (!Misc.isUserExist(user, this.userList))
      throw new Error("User does not exist in this library.");
    const [rightBooking] = this.lendList.filter((booking) =>
      booking.user.id === user.id ? booking : false
    );
    const booksShouldBeReturned = rightBooking.books;

    const returnedBooks = books.filter((book) =>
      booksShouldBeReturned.includes(book)
    );
    if (!booksShouldBeReturned.every(book => returnedBooks.includes(book)))
      throw new Error(
        "Not all books have been returned. Please bring all the books."
      );
    if (!books.every((book) => returnedBooks.includes(book)))
      throw new Error("You didn't rent all this books.");
    returnedBooks.forEach((book) => {
      this.addBook(book);
      this.deleteLendedBook(book.id);
    });
    rightBooking.returnBook(returnDate);
  }
}