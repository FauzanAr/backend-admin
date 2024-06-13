const HttpError = {
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'NOT_FOUND': 404,
    'UNPROCESSABLE_ENTITY': 422,
    'INTERNAL_SERVICE_ERROR': 500,
};

const HttpSuccess = {
    'OK': 200,
    'CREATED': 201,
};

export default {
    HttpError,
    HttpSuccess,
}