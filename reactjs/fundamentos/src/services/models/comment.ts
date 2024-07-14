import { Author } from "./author";

export class Comment {
  id: string;
  author: Author;
  content: string;
  likes: number;
  publishedAt: Date;
}