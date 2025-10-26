import { test, expect } from "@playwright/test";
import { loadUser } from "../../../utils/userStorage";
const API_BASE_URL = process.env.API_BASE_URL;

const userCredential = loadUser();

test(
  "should login user via API",
  { tag: ["@api", "@auth", "@smoke", "@positive"] },
  async ({ request }) => {
    const loginRes = await request.post(`${API_BASE_URL}/users/login`, {
      data: {
        email: userCredential.email,
        password: userCredential.password,
      },
    });
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();

    const token = loginData.access_token;
    expect(token).toBeTruthy();

    const profileRes = await request.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    expect(profileRes.status()).toBe(200);
  }
);

test(
  "should reject login with missing email",
  { tag: ["@api", "@auth", "@smoke", "@negative"] },
  async ({ request }) => {
    const res = await request.post(`${API_BASE_URL}/users/login`, {
      data: {
        email: "",
        password: userCredential.password,
      },
    });
    expect(res.status()).toBe(401);
  }
);

test(
  "should reject login with missing password",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const res = await request.post(`${API_BASE_URL}/users/login`, {
      data: {
        email: userCredential.email,
        password: "",
      },
    });
    expect(res.status()).toBe(401);
  }
);

test(
  "should reject login with missing password and email @api @auth @negative ",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const res = await request.post(`${API_BASE_URL}/users/login`, {
      data: {
        email: "",
        password: "",
      },
    });
    expect(res.status()).toBe(401);
  }
);
