import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    created,
} from "../../helpers/http.js";
import { createOrUpdateUserSchema } from "../../schemas/user.js";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            createOrUpdateUserSchema.parse(params);

            const result = await this.createUserUseCase.execute(params);

            return created(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return badRequest({
                    errorMessage: err.errors[0].message,
                });
            }

            if (err instanceof EmailAlreadyInUseError) {
                return badRequest({
                    errorMessage: err.message,
                });
            }

            console.error(err);
            return internalServerError();
        }
    }
}
