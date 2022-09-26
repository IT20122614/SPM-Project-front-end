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
  localStorage.setItem('userName',user.name)
  localStorage.setItem('profilePic',user.image)
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
  const response = await http.post(endpoint + "/save", user, {
    headers: { Authorization: "" },
  });
  return response;
}

export async function updateUser(data) {
  const id = localStorage.getItem("userId");
  const updatedUser = {
    id: id,
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
    password: data.newPassword,
    currentPassword: data.currentPassword,
    image:data.image
  };
  
  return await http.put(endpoint + "/update", updatedUser);
}

export async function deleteUser(id) {
  return await http.delete(endpoint + `/${id}`);
}
