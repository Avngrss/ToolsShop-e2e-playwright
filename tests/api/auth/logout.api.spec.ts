import { test, expect } from "@playwright/test";
import { loadUser } from "../../../utils/userStorage";

const userCredential = loadUser();

test(
  "should logout user via API",
  { tag: ["@api", "@auth", "@smoke", "@positive"] },
  async ({ request }) => {
    const loginRes = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: userCredential.email,
          password: userCredential.password,
        },
      }
    );
    expect(loginRes.status()).toBe(200);
    const loginData = await loginRes.json();

    const token = loginData.access_token;
    expect(token).toBeTruthy();

    const logoutRes = await request.get(
      "https://api.practicesoftwaretesting.com/users/logout",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    expect(logoutRes.status()).toBe(200);
  }
);
