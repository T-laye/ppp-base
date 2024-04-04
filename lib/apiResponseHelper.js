const ApiResponse = {
  statusCode: null,
  message: "",
  data: null,
  count: null,
  error: undefined,
};

export default function ApiResponseDto({statusCode, message, data, count, error}) {
  return {
    ...ApiResponse,
    statusCode,
    message,
    data,
    count,
    error,
  };
}
