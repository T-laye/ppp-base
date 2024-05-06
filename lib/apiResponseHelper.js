const ApiResponse = {
  statusCode: null,
  message: "",
  data: null,
  count: null,
  error: undefined,
  totalPages: null
};

export default function ApiResponseDto({statusCode, message, data, count, error, totalPages}) {
  return {
    ...ApiResponse,
    statusCode,
    message,
    data,
    count,
    error,
    totalPages
  };
}
