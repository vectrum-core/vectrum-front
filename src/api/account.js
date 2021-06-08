export default ({
  rootUrl,
  apiUrl,
  get,
  post,
  authorizedPost,
  authorizedPut,
  authorizedGet
}) => {

  const createAccount = (account) => {
    const ApiVersion = "v1";
    return authorizedPost({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/vectrum/account/create`,
      contentType: "application/json",
      data: { account },
    });
  }


  const getAccountActions = (account) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/vectrum/account/actions`,
      contentType: "application/json",
      data: { account },
    });
  }

  return {
    createAccount,
    getAccountActions,
  };
}
