import { API_URI } from "../util/constants";

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URI}/api/user/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const { token } = await response.json();
    return { token };
  }
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URI}/api/user/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const { token } = await response.json();
    return { token };
  }
}
