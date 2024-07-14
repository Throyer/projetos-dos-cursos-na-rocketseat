import css from "./comment.module.css"

import { createStyles } from "../../utils/css-modules-utils"
import { ThumbsUp, Trash } from "@phosphor-icons/react";
import { Avatar } from "../avatar/avatar";
import { Time } from "../time/time";

const styles = createStyles(css);

export const Comment = ({ content, likes, publishedAt }) => {
  return (
    <div className={styles('comment')}>
      <Avatar src="https://github.com/throyer.png" />

      <div className={styles('comment-box')}>
        <div className={styles('comment-content')}>
          <header>
            <div className={styles('author-and-time')}>
              <strong>Renato Henrique</strong>
              <Time when={publishedAt} />
            </div>

            <button title="Remover comentário">
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}