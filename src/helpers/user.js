import validator from "validator";
import bcrypt from "bcrypt";

export const verifyIfPasswordIsValid = (password) =>
    password.trim().length >= 6;

export const verifyIfEmailIsValid = (email) => validator.isEmail(email);

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};
