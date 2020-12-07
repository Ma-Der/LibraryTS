interface pics {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
}

export class Misc {
    constructor() {}

    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    static randomPic(): string {
        const images: pics = {
            img1: '../img/01.jpg',
            img2: '../img/02.jpg',
            img3: '../img/03.jpg',
            img4: '../img/04.jpg',
            img5: '../img/05.jpg'
        }
        const value = Object.values(images);
        const randomNum = Math.floor(Math.random() * 5);
        return value[randomNum];
    }

    static isStringValid(str: string): void {
        if(str.length === 0) throw new Error("Empty string.")
    }
}

