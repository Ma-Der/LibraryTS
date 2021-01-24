import { Book } from "../Book";
import { Library } from "../Library";
import { User } from "../User";
import { Misc } from '../Misc';

/*

Bibliotekarz dodał 17 książek do bibilioteki
  - pomylił się przy jednej i dodał ją 2 razy co spowodowało błąd
  - 2 książki usunięto ze względu na ich zły stan
Do biblioteki dopisało się 3 nowych klientów:
 - przy wprowadzaniu dodano 2 razy tego samego użytkownika co spowodowało błąd

Pierwszy user wypożyczył 4 pozycje, drugi 5, trzeci 3:
 - przez pomyłkę bibliotekarz wpisał przy wypożyczaniu nazwę klienta który nie istnieje w systemie co spowodowało błąd

 Pierwszy użytkownik zwrócił 3 pozycje po 7 dniach, co spowodowało błąd
 Drugi użytkownik zwrócił 6 pozycji po 7 dniach, co spowodowało błąd
 Trzeci zwrócił 3 pozycje po 7 dniach

 Pierwszy zwrócił 4 pozycje po 10 dniach przez co została naliczona kara po 7 dniach za każdy dzień 10zł, czyli 30zł
 Drugi zwrócił 5 pozycji po 12 dniach przez co została naliczona kara 50zł

 Przy zwrocie pierwszego użytkownika bibliotekarz pomylił się i wstawił datę zwrotu wcześniejszą niż wypożyczenia co spowodowało błąd

*/

const gambit = new Book("Gambit", "Neil Shon", "short description");
const fightingDestiny = new Book("Fighting with destiny", "Carl Lewis", "very short description");
const temptations = new Book("Temptations", "Tom Nowak", "another short description");
const original = new Book("Original Sin", "Jane Below", "so short desscription");
const fixer = new Book("Fixer", "John Grisham", "good good book");
const wyborny = new Book("Wyborny trup", "Agustina Bazterrica", "horror");
const nurt = new Book("Nurt", "Tim Johnston", "thriller");
const ostatni = new Book("Ostatni", "Maja Lunde", "romance");
const babiagora = new Book("W cieniu babiej góry", " Irena Małsa", "document");
const szepty = new Book("Szepty spoza nicości", "Remigiusz Mróz", "thirller");
const korona = new Book("Odzyskana korona", "Monika Skabra", "romance");
const dywan = new Book("Dywan z wkładką", "Marta Kisiel", "comedy");
const zycie = new Book("Życie między wcieleniami", "Michael Newton", "sci-fi");
const freebirds = new Book("Free Birds", "Emilia Szelest", "romance");
const dom = new Book('Dziewiąty dom', "Leigh Bardugo", "thriller");
const moon = new Book("The Darkest Moon", "Anna Todd", "thriller");
const lina = new Book("Lina", "Sara Antczak", "document");
const lin = new Book("Lina", "Sara Antczak", "document");

const matty = new User("Matty");
const frank = new User("Frank");
const jerry = new User("Jerry");
const jared = new User("Jared");

const library = new Library();

describe('To library added', () => {
  library.addBook(gambit, fightingDestiny, temptations, original, fixer, wyborny, nurt, ostatni, babiagora, szepty, korona, dywan, zycie, freebirds, dom, moon, lina);
  
  test('17 books', () => {
    const properLength = 17;
    expect(library.bookList).toHaveLength(properLength);
  });

  test('twice same book', () => {
    expect(() => library.addBook(gambit)).toThrowError("This book is already in Library.");
  });

  describe('users', () => {
    library.addUser(matty);
    library.addUser(frank);
    library.addUser(jerry);

    test('3 new', () => {
      const properUserLength = 3;

      expect(library.userList).toHaveLength(properUserLength);
    });

    test('added same user twice', () => {
      expect(() => library.addUser(matty)).toThrowError("User already exists.");      
    });
  })
});

describe('From Library', () => {
  test('deleted 2 books', () => {
    const properLength = 15;

    library.deleteBook(lina);
    library.deleteBook(moon);
    expect(library.bookList).toHaveLength(properLength);
  });
});

describe('User', () => {

  test('matty borrowed 4 books, frank 5 and jerry 3', () => {
    const properBookListLength = 3;
    library.rentBook(matty, gambit, fightingDestiny, temptations, original);
    library.rentBook(frank, fixer, wyborny, nurt, ostatni, babiagora);
    library.rentBook(jerry, szepty, korona, dywan);
    
    const booksAvailable = [zycie, freebirds, dom];

    const mattysRentedBooks = [gambit, fightingDestiny, temptations, original];
    const franksRentedBooks = [fixer, wyborny, nurt, ostatni, babiagora];
    const jerrysRentedBooks = [szepty, korona, dywan];

    const [mattysBooking] = library.lendList.filter(booking => booking.user.id === matty.id);
    const [franksBooking] = library.lendList.filter(booking => booking.user.id === frank.id);
    const [jerrysBooking] = library.lendList.filter(booking => booking.user.id === jerry.id);

    expect(library.bookList).toHaveLength(properBookListLength);
    expect(library.bookList).toEqual(booksAvailable);
    expect(mattysBooking.books).toEqual(mattysRentedBooks);
    expect(franksBooking.books).toEqual(franksRentedBooks);
    expect(jerrysBooking.books).toEqual(jerrysRentedBooks);
  });

  test('that not existed was typed as borrower that caused error', () => {
    expect(() => library.rentBook(jared, freebirds)).toThrowError("User does not exist in this library.");
  });  
});

describe('Books were returned', () => {
  test('by matty, but librarian put date of returning books earlier than date of renting', () => {
    expect(() => library.returnBook(matty, Misc.addDays(new Date(), -2), gambit, fightingDestiny, temptations, original)).toThrowError("Return date cannot be less than lend date.");
  });
  
  test('by matty(4 books borrowed) after 7 days with 3 position which created an error', () => {
    expect(() => library.returnBook(matty, Misc.addDays(new Date(), 7), gambit, fightingDestiny, original)).toThrowError("Not all books have been returned. Please bring all the books.");
  });

  test('by frank(5 books borrowed) after 7 days with 6 positions which created an error', () => {
    expect(() => library.returnBook(frank, Misc.addDays(new Date(), 7), fixer, wyborny, nurt, ostatni, babiagora, temptations)).toThrowError("You didn't rent all this books.");
  });

  test('by jerry(3 books borrowed) after 7 days with 3 positions', () => {    
    library.returnBook(jerry, Misc.addDays(new Date(), 7), szepty, korona, dywan);

    const bookListLength = 6;
    const bookListContent = [zycie, freebirds, dom, szepty, korona, dywan];
    expect(library.bookList).toHaveLength(bookListLength);
    expect(library.bookList).toEqual(bookListContent);
  });

  test('by matty(4 books borrowed) after 10 days with 4 positions', () => {
    const penaltyValueInformation = 120;
    const bookListLength = 10;
    const bookListContent = [zycie, freebirds, dom, szepty, korona, dywan, gambit, fightingDestiny, temptations, original];

    library.returnBook(matty, Misc.addDays(new Date(), 10), gambit, fightingDestiny, temptations, original);
    const [mattysBooking] = library.lendList.filter(booking => booking.user.id === matty.id);
    
    expect(mattysBooking.penalty).toEqual(penaltyValueInformation);
    expect(library.bookList).toHaveLength(bookListLength);
    expect(library.bookList).toEqual(bookListContent);
  });

  test('by frank(5 books borrowed) after 12 days with 5 positions', () => {
    const penaltyValueInformation = 250;
    const bookListLength = 15;
    const bookListContent = [zycie, freebirds, dom, szepty, korona, dywan, gambit, fightingDestiny, temptations, original, fixer, wyborny, nurt, ostatni, babiagora];

    library.returnBook(frank, Misc.addDays(new Date(), 12), fixer, wyborny, nurt, ostatni, babiagora);
    const [franksBooking] = library.lendList.filter(booking => booking.user.id === frank.id);
    
    expect(franksBooking.penalty).toEqual(penaltyValueInformation);
    expect(library.bookList).toHaveLength(bookListLength);
    expect(library.bookList).toEqual(bookListContent);
  });
});

