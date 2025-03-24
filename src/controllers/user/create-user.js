import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    created,
} from "../../helpers/http.js";
import { createOrUpdateUserSchema } from "../../schemas/user.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            createOrUpdateUserSchema.parse(params);

            const result = await this.createUserUseCase.execute(params);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return created(result);
        } catch (err) {
            console.error(err);
            if (err instanceof ZodError) {
                return badRequest({
                    errorMessage: err.errors[0].message,
                });
            }
            return internalServerError();
        }
    }
}
