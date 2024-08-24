import { jwtDecode } from "jwt-decode";

export const verifyAccessToken = (token: string) => {
  return jwtDecode(token);
};
