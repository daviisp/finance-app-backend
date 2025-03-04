import { GetUSerByIdUseCase } from "../use-cases/get-user-by-id.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUSerByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.id
            );

            return {
                statusCode: 200,
                body: user,
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
