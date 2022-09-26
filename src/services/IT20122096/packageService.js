import http from "./httpServices";

const endpoint = "/travelPackage";

export async function savePackage(data) {
  return http.post(endpoint + `/save`, data);
}
export async function updatePackage(data) {
  return http.post(endpoint + `/update`, data);
}
export async function getAllPackages() {
  return http.get(endpoint +"/getAll");
}
export async function getPackage(id) {
  return http.get(endpoint + `/${id}`);
}
export async function deletePackage(id) {
  return http.get(endpoint + `/delete/${id}`);
}