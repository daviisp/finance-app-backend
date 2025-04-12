import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    created,
} from "../../helpers/http.js";
import { createUserSchema } from "../../schemas/user.js";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            createUserSchema.parse(params);

            const result = await this.createUserUseCase.execute(params);

            return created(result);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    errorMessage: error.errors[0].message,
                });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    errorMessage: error.message,
                });
            }

            return internalServerError();
        }
    }
}
