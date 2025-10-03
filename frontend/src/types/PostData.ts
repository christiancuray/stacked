export default interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    username: string;
  };
}
