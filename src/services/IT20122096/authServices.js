import http from "./httpServices";
import jwtDecode from "jwt-decode";

const endPoint = "/auth";

export async function loginUser(data) {
  const user = { username: data.email, password: data.password };
  const response = await http.post(endPoint, user, { headers: { Authorization: "" } });
  localStorage.setItem("token", response.data.jwtToken);
  return response;
}
export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function logout() {
  window.localStorage.clear();
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const userData = jwtDecode(token);
    localStorage.setItem("userId", userData.userId);
    return userData;
  } catch (error) {
    return null;
  }
}
