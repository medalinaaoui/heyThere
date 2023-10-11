const apiUrl = {
  baseUrl: "https://hey-there-api-fc5a5cd59152.herokuapp.com/api",
  login: "https://hey-there-api-fc5a5cd59152.herokuapp.com/api/login",
  register: "https://hey-there-api-fc5a5cd59152.herokuapp.com/api/register",
  logout: "https://hey-there-api-fc5a5cd59152.herokuapp.com/api/logout",
};

export const FULLNAME_REGEX = /^(?:[A-Za-z'-]+\s*)+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_.]{1,30}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default apiUrl;
