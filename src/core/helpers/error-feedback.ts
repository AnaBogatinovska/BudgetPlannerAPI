export default (error: any) => {
  return {
    success: false,
    message: error.message,
    data: null,
    error: error,
  };
};
