import validator from "validator";
import bcrypt from "bcrypt";

export const verifyIfIdIsUUID = (id) => validator.isUUID(id);

export const verifyIfPasswordIsValid = (password) =>
    password.trim().length >= 6;

export const verifyIfEmailIsValid = (email) => validator.isEmail(email);

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
