import http from "./httpServices";

const endpoint = "/tripPlan";

export async function getAllTripPlans() {
  const userId = localStorage.getItem("userId");
  return await http.get(endpoint + `/getAll/${userId}`);
}
export async function saveNewTripPlan(data) {
  return await http.post(endpoint + "/save", data);
}
export async function deleteTripPlan(tripId) {
  return await http.get(endpoint+`/delete/${tripId}`)
}
export async function getTripPlanById(tripId) {
  return await http.get(endpoint + `/${tripId}`);
}
export async function payForTripPlan(data) {
  return await http.post(endpoint + "/pay", data);
}

export async function getAllHotels() {
  return await http.get("/hotel/display")
}