import { test, expect } from "@playwright/test";
import { createUser } from "../../../utils/userFactory";
import { saveUser } from "../../../utils/userStorage";

test(
  "should register new user via API",
  { tag: ["@api", "@auth", "@positive"] },
  async ({ request }) => {
    const user = createUser();

    const response = await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      {
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          address: {
            street: user.street,
            city: user.city,
            state: user.state,
            country: user.country,
            postal_code: user.postalCode,
          },
          phone: user.phone,
          dob: user.dateOfBirth,
          password: user.password,
          email: user.email,
        },
      }
    );

    expect(response.status()).toBe(201);
    saveUser({ email: user.email, password: user.password });
  }
);

test(
  "should reject missing email @api @auth @negative",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const user = createUser({ email: "" });
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      { data: { ...user, email: "" } }
    );
    expect(res.status()).toBe(422);
  }
);

test(
  "should reject short password @api @auth @negative",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const user = createUser({ password: "123" });
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      { data: user }
    );
    expect(res.status()).toBe(422);
  }
);

test(
  "should reject duplicate email @api @auth @negative",
  { tag: ["@api", "@auth", "@negative"] },
  async ({ request }) => {
    const user = createUser();
    await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      {
        data: user,
      }
    );
    const res = await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      { data: user }
    );
    expect(res.status()).toBe(422);
  }
);
