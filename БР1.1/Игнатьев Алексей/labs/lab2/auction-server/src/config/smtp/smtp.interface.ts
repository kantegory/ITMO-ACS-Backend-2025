export interface registrationMessage {
  email: string;
}
export interface resetPasswordMessage extends registrationMessage {
  link: string;
}
export interface mailConfirmationMessage extends registrationMessage {
  email: string;
  code: number;
}
