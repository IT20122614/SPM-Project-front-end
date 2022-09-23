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
export async function getAllBookings() {
  const userId = localStorage.getItem("userId");
  return await http.get(endpoint + `/getAllBookings/${userId}`);
}
export async function getAllPayments() {
  const userId = localStorage.getItem("userId");
  return await http.get(endpoint + `/getAllPayments/${userId}`);
}

export async function getAllPlaces() {
  return await http.get("/place/getAll");
}
export async function getAllHotels() {
  return await http.get("/hotel/display")
}
export async function getAllTransports() {
  return await http.get("/transport/getAll");
}