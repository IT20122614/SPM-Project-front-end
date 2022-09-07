import http from "./httpServices";

const endpoint = "/tripPlan";

export async function getAllTripPlans() {
  const userId = localStorage.getItem("userId");
  return await http.get(endpoint + `/getAll/${userId}`);
}
export async function saveNewTripPlan(data) {
  return await http.post(endpoint + "/save", data);
}
