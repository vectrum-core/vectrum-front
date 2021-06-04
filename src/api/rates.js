export default ({
  rootUrl,
  apiUrl,
  get,
  post,
  authorizedPost,
  authorizedPut,
  authorizedGet
}) => {

  const getCurrencyRates = () => {
    const ApiVersion = "v1";
    return get({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/rates`,
      contentType: "application/json",
      data: {},
    });
  }


  return {
    getCurrencyRates,
  };
}
