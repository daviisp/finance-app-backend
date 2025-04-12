import { TokenVerifierAdapter } from "../adapters/token-verifier.js";

const tokenVerifierAdapter = new TokenVerifierAdapter();

export const auth = (request, response, next) => {
    try {
        const accessToken = request.headers?.authorization?.split("Bearer ")[1];

        if (!accessToken) {
            return response.status(401).json({ errorMessage: "Unauthorized." });
        }

        const decodedToken = tokenVerifierAdapter.execute(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_SECRET
        );

        if (!decodedToken) {
            return response.status(401).json({ errorMessage: "Unauthorized." });
        }

        request.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error(error);
        return response.status(401).json({ errorMessage: "Unauthorized." });
    }
};
