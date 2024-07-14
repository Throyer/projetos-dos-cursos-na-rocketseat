import { Author } from "./author";
import { Comment } from "./comment";
import { Content } from "./content";

export class Post {
  id: string;
  publishedAt: Date;
  author: Author;
  content: Content[];
  comments: Comment[];
};