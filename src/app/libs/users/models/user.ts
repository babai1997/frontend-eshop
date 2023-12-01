export class User {
  _id?: string;
  name?: string;
  password?: string;
  email: string | undefined;
  phone?: string;
  token?: string;
  isAdmin?: true;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
}
