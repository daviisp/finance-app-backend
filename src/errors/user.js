export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use.`);
        this.name = "EmailAlreadyInUseError";
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super("User not found.");
        this.name = "UserNotFoundError";
    }
}

export class InvalidPasswordError extends Error {
    constructor() {
        super("Incorrect password.");
        this.name = "InvalidPasswordError";
    }
}
