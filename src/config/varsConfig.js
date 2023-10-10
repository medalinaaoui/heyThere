const apiUrl = {
  baseUrl: "http://localhost:8800/api",
  login: "http://localhost:8800/api/login",
  register: "http://localhost:8800/api/register",
  logout: "http://localhost:8800/api/logout",
};

export const FULLNAME_REGEX = /^(?:[A-Za-z'-]+\s*)+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_.]{1,30}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default apiUrl;
