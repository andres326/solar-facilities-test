import { API_URI } from "../util/constants";

export async function uploadFile({ file, id }, token) {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("facilityId", id);

  return fetch(`${API_URI}/api/file`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
