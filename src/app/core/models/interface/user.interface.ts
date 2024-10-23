export interface User {
  readonly id?: string;
  name?: string;
  email: string;
  password: string;
  role: string;
  creationDate: Date;
}
