const setCookie = (tokens) => {
  console.log(document.cookie);

  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`; //1day
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`; //30days
};

const getCookie = (cookieName) => {
  const cookie = document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
  if (!cookie) {
    console.log(`${cookieName} not found`);
    return null;
  }
  return cookie;
};

export { setCookie, getCookie };
