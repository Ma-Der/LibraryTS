import { Booking } from "../Booking";
import { Book } from "../Book";
import { User } from "../User";

const original = new Book(
  "Original Sin",
  "Jane Below",
  "so short desscription"
);
const fixer = new Book("Fixer", "John Grisham", "good good book");

const matty = new User("Matty");

describe("Booking tests method behavior", () => {
  const booking1 = new Booking(matty, [fixer, original]);

  it("set penalty depending on return date", () => {
    expect(booking1.setPenalty(new Date(2021, 1, 17))).toBe(400);
  });

  it("returnBook displays information according to date if penalty is counted.", () => {
    expect(booking1.returnBook(new Date(2021, 1, 17))).toBe(
      "Matty need to pay a penalty of 400 PLN."
    );
  });
});

describe("Booking tests for errors", () => {
  const booking1 = new Booking(matty, [fixer, original]);
  it("setPenalty should throw error when date is less than lendDate in Booking", () => {
    () => expect(booking1.setPenalty(new Date(2020, 12, 28))).toThrowError();
  });

  it("setPenalty should throw error when passed wrong arguments", () => {
    () => expect(booking1.setPenalty(23)).toThrowError();
  });

  it("retrunBook should throw same errors as setPenalty, because it depends on that function", () => {
    () => expect(booking1.returnBook(new Date(2020, 12, 28))).toThrowError();
  });

  it("returnBook should throw error when passed wrong arguments", () => {
    () => expect(booking1.returnBook([23])).toThrowError();
  });
});
