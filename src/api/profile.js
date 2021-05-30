export default ({
  rootUrl,
  apiUrl,
  get,
  post,
  authorizedPost,
  authorizedPut,
  authorizedGet
}) => {

  const profileSignInByEmail = (email, password) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signin/email`,
      contentType: "application/json",
      data: { email, password },
    });
  }

  const profileSignInByUsername = (username, password) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signin/username`,
      contentType: "application/json",
      data: { username, password },
    });
  }

  const profileSignInByTelegramAuthData = (telegramAuthData) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signin/telegram`,
      contentType: "application/json",
      data: { telegramAuthData },
    });
  }

  const profileSignUpByEmail = (email, password, extra = {}) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signup/email`,
      contentType: "application/json",
      data: { email, password, ...extra },
    });
  }

  const profileSignUpByUsername = (username, password, extra = {}) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signup/username`,
      contentType: "application/json",
      data: { username, password, ...extra },
    });
  }

  const profileSignUpByTelegramAuthData = (telegramAuthData = {}, extra = {}) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/signup/telegram`,
      contentType: "application/json",
      data: { telegramAuthData, ...extra },
    });
  }

  const profileLogOut = () => {
    const ApiVersion = "v1";
    return authorizedPost({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/logout`,
      contentType: "application/json",
      data: {},
    });
  }

  const profileGetEmail = () => {
    const ApiVersion = "v1";
    return authorizedGet({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/email`,
      contentType: "application/json",
      data: {},
    });
  }

  const profileEmailCheck = (email, nonce) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/email/check`,
      contentType: "application/json",
      data: { email, nonce },
    });
  }

  const profileEmailConfirmGetCode = (email, language) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/email/code`,
      contentType: "application/json",
      data: { email, language },
    });
  }

  const profileEmailConfirm = (email, code, language) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/profile/email/confirm`,
      contentType: "application/json",
      data: { email, code, language },
    });
  }


  return {
    profileEmailConfirm,
    profileEmailConfirmGetCode,
    profileEmailCheck,
    profileGetEmail,
    profileLogOut,
    profileSignUpByEmail,
    profileSignUpByUsername,
    profileSignUpByTelegramAuthData,
    profileSignInByEmail,
    profileSignInByUsername,
    profileSignInByTelegramAuthData,
  };
}
