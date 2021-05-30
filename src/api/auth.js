export default ({
  apiUrl,
  post,
}) => {

  const authCheckTelegramAuthData = (telegramAuthData) => {
    const ApiVersion = "v1";
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/auth/telegram/check`,
      contentType: "application/json",
      data: { ...telegramAuthData },
    });
  }

  return {
    authCheckTelegramAuthData,
  };
}
