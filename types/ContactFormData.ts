export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  attachmentPath?: string;
}

export const validContactFormData: ContactFormData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  subject: "Return",
  message:
    "Hello! I would like to get more information about your services. Thank you!",
  attachmentPath: "./fixtures/documents/testFile.txt",
};
