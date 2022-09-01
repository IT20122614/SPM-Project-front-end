import service from "../IT20122096/httpServices";

const url ="http://localhost:8080/api";

export async function places() {
  return await service.get(url + "/places");
}

export async function getPlace(id) {
  return await service.get(url + `/place/${id}`);
}

export async function savePlace(data) {
  return await service.post(url + `/place`, data);
}

export async function updatePlace(id, data) {
  return await service.put(url + `/places/${id}`, data);
}

export async function deletePlace(id) {
  return await service.delete(url + `/place/${id}`);
}

