export const ok = (body) => {
    return {
        statusCode: 200,
        body,
    };
};

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    };
};

export const updated = (body) => {
    return {
        statusCode: 200,
        body,
    };
};

export const okEmpty = () => {
    return {
        statusCode: 204,
        body: null,
    };
};

export const found = (body) => {
    return {
        statusCode: 200,
        body,
    };
};

export const notFound = (body) => {
    return {
        statusCode: 404,
        body,
    };
};

export const badRequest = (body) => {
    return {
        statusCode: 400,
        body,
    };
};

export const internalServerError = () => {
    return {
        statusCode: 500,
        body: {
            errorMessage: "Internal server error",
        },
    };
};
