import http from "./httpServices";

const endpoint = "/user";

export async function getUsers() {
  return await http.get(endpoint);
}
export async function getUser() {
  const id = localStorage.getItem("userId");
  return await http.get(endpoint + `/${id}`);
}
export async function isAdmin() {
  const { data: user } = await getUser();
  return user.hasOwnProperty('isAdmin')===true?user.isAdmin : false; 
}
export async function getStaff(id) {
  return await http.get(endpoint + `/${id}`);
}

export async function saveUser(data) {
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  const response = await http.post(endpoint+"/save", user);
  return response;
}

export async function updateUser(id, data) {
  return await http.put(endpoint + `/${id}`, data);
}

export async function deleteUser(id) {
  return await http.delete(endpoint + `/${id}`);
}
