const ApiResponse = {
  statusCode: null,
  message: "",
  data: null,
  error: undefined,
};

export default function ApiResponseDto({statusCode, message, data, error}) {
  return {
    ...ApiResponse,
    statusCode,
    message,
    data,
    error,
  };
}
