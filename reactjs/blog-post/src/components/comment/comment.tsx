import { useState } from "react";

import css from "./comment.module.css"

import { createStyles } from "../../utils/css-modules-utils"
import { ThumbsUp, Trash } from "@phosphor-icons/react";
import { Avatar } from "../avatar/avatar";
import { Time } from "../time/time";
import { Author } from "../../services/models/author";

const styles = createStyles(css);

type CommentProps = {
  id: string;
  author: Author;
  content: string
  likes: number;
  publishedAt: Date;
  onDelete: (id: string) => void;
}

export const Comment = ({ id, author, content, likes, publishedAt, onDelete }: CommentProps) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleIncreaseLikes = () => {
    setLikeCount(state => state + 1);
  }

  const handleClickDelete = () => {
    onDelete && onDelete(id);
  }

  return (
    <div className={styles('comment')}>
      <Avatar src={author.avatar} />

      <div className={styles('comment-box')}>
        <div className={styles('comment-content')}>
          <header>
            <div className={styles('author-and-time')}>
              <strong>{author.name}</strong>
              <Time when={publishedAt} />
            </div>

            <button onClick={handleClickDelete} title="Remover comentário">
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleIncreaseLikes}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}