import { User } from "../types/User";

export const createUser = (partialUser: Partial<User> = {}): User => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);

  return {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    street: "123 Main St",
    postalCode: "12345",
    city: "New York",
    state: "NY",
    country: "Canada",
    phone: "1234567890",
    email: `user${timestamp}${randomSuffix}@example.com`,
    password: "SecurePass123!",
    ...partialUser,
  };
};
