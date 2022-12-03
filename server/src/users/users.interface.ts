export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  steamId?: number;
  createdAt: string;
  updatedAt: string;
}
