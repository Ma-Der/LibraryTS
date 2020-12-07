import { Book } from './Book';
import { Library } from './Library';
import { User } from './User';
import { Misc } from './Misc';

const gambit = new Book('Gambit', 'Neil Shon', 'short description');
const fightingDestiny = new Book('Fighting with destiny', 'Carl Lewis', 'very short description');
const temptations = new Book('Temptations', 'Tom Nowak', 'another short description');
const original = new Book('Original Sin', 'Jane Below', 'so short desscription');
const fixer = new Book('Fixer', 'John Grisham', 'good good book');

const matty = new User('Matty');
const frank = new User('Frank');

const library = new Library();

library.addBook(gambit, fightingDestiny, temptations, original, fixer);
library.rentBook(matty, gambit, original, temptations);
library.rentBook(frank, fixer, fightingDestiny);
library.returnBook(matty, Misc.addDays(new Date(), 8), original, gambit, temptations);
library.returnBook(frank, Misc.addDays(new Date(), 10), fightingDestiny, fixer);

console.log(library);