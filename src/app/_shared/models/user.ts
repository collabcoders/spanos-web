export class User {
    userId: number;
    email: string;
    phone: string;
    fname: string;
    lname: string;
    password: string;
    image: string;
    access: string;
    token: string;
    disable: boolean;
    dateAdded: Date;
    constructor(
        userId: number,
        email: string,
        phone: string,
        fname: string,
        lname: string,
        password: string,
        image: string,
        access: string,
        token: string,
        disable: boolean,
        dateAdded: Date
    ) {
        this.userId = userId;
        this.email = email;
        this.phone = phone;
        this.fname = fname;
        this.lname = lname;
        this.password = password;
        this.image = image;
        this.access = access;
        this.token = token;
        this.disable = disable;
        this.dateAdded = dateAdded;
    }
}
