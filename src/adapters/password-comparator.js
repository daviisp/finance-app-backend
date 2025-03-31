import bcrypt from "bcrypt";

export class PasswordComparatorAdapter {
    async execute(password, passwordOnDb) {
        return await bcrypt.compare(password, passwordOnDb);
    }
}
