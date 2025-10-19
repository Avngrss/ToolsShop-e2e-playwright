import { test, expect } from "@playwright/test";
import { loadUser } from "../../../utils/userStorage";

const userCredential = loadUser();

test(
  "should login user via API",
  { tag: ["@api", "@auth", "@smoke", "@positive"] },
  async ({ request }) => {
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: userCredential.email,
          password: userCredential.password,
        },
      }
    );
    expect(res.status()).toBe(200);

    const profileRes = await request.get(
      "https://api.practicesoftwaretesting.com/users/me"
    );
    expect(profileRes.status()).toBe(200);

    const profile = profileRes.json();
    expect(profile).toMatchObject({
      email: userCredential.email,
      first_name: expect.any(String),
      last_name: expect.any(String),
      phone: expect.any(String),
      dob: expect.any(String),
      provider: expect.any(String),
      totp_enabled: expect.any(Boolean),
      enabled: true,
      failed_login_attempts: expect.any(Number),
      created_at: expect.any(String),
    });
  }
);

test(
  "should reject login with missing email",
  { tag: ["@api", "@auth", "@smoke", "@negative"] },
  async ({ request }) => {
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: "",
          password: userCredential.password,
        },
      }
    );
    expect(res.status()).toBe(401);
  }
);

test(
  "should reject login with missing password",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: userCredential.email,
          password: "",
        },
      }
    );
    expect(res.status()).toBe(401);
  }
);

test(
  "should reject login with missing password and email @api @auth @negative ",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: "",
          password: "",
        },
      }
    );
    expect(res.status()).toBe(401);
  }
);
