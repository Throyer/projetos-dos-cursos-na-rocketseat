import { Author } from "./author";
import { Comment } from "./comment";

export class Post {
  id: string;
  publishedAt: Date;
  author: Author;
  content: string;
  comments: Comment[];
};