import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";

export class CreateUserController {
    execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                "firstName",
                "lastName",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param: ${field}`,
                        },
                    };
                }
            }

            if (params.password.length < 6) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage:
                            "Password must be at least 6 characters long",
                    },
                };
            }

            if (!validator.isEmail(params.email)) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: "Invalid email",
                    },
                };
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = createUserUseCase.execute(params);

            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (err) {
            console.error(err);
            return {
                statusCode: 500,
                body: {
                    errorMessage: "Internal server error",
                },
            };
        }
    }
}
