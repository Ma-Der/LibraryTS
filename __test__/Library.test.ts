import { Book } from "../Book";
import { Booking } from "./Booking";
import { Library } from "../Library";
import { User } from "../User";
import { Misc } from "../Misc";

const gambit = new Book("Gambit", "Neil Shon", "short description");
const fightingDestiny = new Book(
  "Fighting with destiny",
  "Carl Lewis",
  "very short description"
);
const temptations = new Book(
  "Temptations",
  "Tom Nowak",
  "another short description"
);
const original = new Book(
  "Original Sin",
  "Jane Below",
  "so short desscription"
);
const fixer = new Book("Fixer", "John Grisham", "good good book");

const matty = new User("Matty");
const frank = new User("Frank");
const jerry = new User("Jerry");

const library = new Library();

describe("Library tests methods behavior", () => {
  it("addBook should be able to add multiple books", () => {
    library.addBook(gambit, fightingDestiny, temptations, original, fixer);
    expect(library.bookList).toEqual([
      gambit,
      fightingDestiny,
      temptations,
      original,
      fixer
    ]);
  });

  it("addUser should add new user", () => {
    library.addUser(matty);
    expect(library.userList).toEqual([matty]);
  });

  it("deleteBook should delete book from book list", () => {
    library.deleteBook(gambit);
    expect(library.bookList).toEqual([
      fightingDestiny,
      temptations,
      original,
      fixer
    ]);
  });

  it("rentBook should send book or books to lendedBooksList, add booking to lendList, remove them from bookList", () => {
    library.rentBook(matty, original, temptations);

    expect(library._lendedBookList).toEqual([original, temptations]);
    expect(library.lendList[0]).toHaveProperty("user", matty);
    expect(library.lendList[0]).toHaveProperty("books", [
      original,
      temptations
    ]);
    expect(library.lendList[0]).toHaveProperty("lendDate", new Date());
    expect(library.lendList[0]).toHaveProperty(
      "returnDate",
      Misc.addDays(new Date(), 7)
    );
    expect(library.lendList[0]).toHaveProperty("penalty", 0);
    expect(library.lendList).toHaveLength(1);
    expect(library.bookList).toEqual([fightingDestiny, fixer]);
  });

  it("returnBook should delete rented books from lendedBookList and add these books back to bookList", () => {
    library.returnBook(
      matty,
      Misc.addDays(new Date(), 10),
      original,
      temptations
    );
    expect(library._lendedBookList).toEqual([]);
    expect(library.bookList).toEqual([
      fightingDestiny,
      fixer,
      original,
      temptations
    ]);
  });
});

describe("Library tests for errors", () => {
  it("addBook insert argument other than of type IBook should throw an error", () => {
    () => expect(library.addBook("books")).toThrowError();
  });

  it("addBook adding already existing book in library should throw error", () => {
    () => expect(library.addBook(fixer)).toThrowError();
  });

  it("addUser insert argument other than of type IUser should thorw an error", () => {
    () => expect(library.addUser("Morty")).toThrowError();
  });

  it("addUser adding already existing book in library should throw error", () => {
    () => expect(library.addUser(matty)).toThrowError();
  });

  it("deleteBook insert argument other then of type IBook should throw an error", () => {
    () => expect(library.deleteBook("cosos")).toThrowError();
  });

  it("deleteBook deleting not existing book in library should throw error ", () => {
    () => expect(library.deleteBook(gambit)).toThrowError();
  });

  it("rentBook renting book already rented should throw error", () => {
    library.addUser(frank);
    library.rentBook(frank, fixer, fightingDestiny);

    () => expect(library.rentBook(frank, fixer)).toThrowError();
  });

  it("rentBook user not in library renting book should return error", () => {
    const jerry = new User("Jerry");

    () => expect(library.rentBook(jerry, temptations)).toThrowError();
  });

  it("returnBook user not in library returning books should throw an error", () => {
    () => expect(library.returnBook(jerry, temptations)).toThrowError();
  });

  it("returnBook returnDate cannot be less than lendDate, should throw an error", () => {
    () =>
      expect(
        library.returnBook(frank, new Date(2020, 12, 20), fixer)
      ).toThrowError();
  });

  it("returnBook not all books returned by the user should throw error", () => {
    library.addUser(jerry);
    library.rentBook(jerry, original, fixer);
    () =>
      expect(
        library.returnBook(jerry, new Date(2021, 1, 6), fixer)
      ).toThrowError();
  });

  it("returnBook too much returned books should throw error", () => {
    () =>
      expect(
        library.returnBook(jerry, new Date(2021, 1, 6), fixer, temptations)
      ).toThrowError();
  });
});
