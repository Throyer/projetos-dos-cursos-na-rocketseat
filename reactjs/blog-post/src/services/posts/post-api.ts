import json from "../../fake/posts.json"
import { Post } from "../models/post";

export const findAllPosts = (): Post[] => {
  return json.map(post => ({
    id: post.id,
    author: post.author,
    publishedAt: new Date(post.publishedAt),
    content: post.content,
    comments: post.comments.map(comment => ({
      ...comment,
      publishedAt: new Date(comment.publishedAt),
    }))
  }));;
}