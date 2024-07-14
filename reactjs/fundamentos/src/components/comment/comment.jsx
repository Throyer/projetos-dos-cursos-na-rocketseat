import css from "./comment.module.css"

import { createStyles } from "../../utils/css-modules-utils"
import { ThumbsUp, Trash } from "@phosphor-icons/react";
import { Avatar } from "../avatar/avatar";

const styles = createStyles(css);

export const Comment = ({ content, likes }) => {
  return (
    <div className={styles('comment')}>
      <Avatar src="https://github.com/throyer.png" />

      <div className={styles('comment-box')}>
        <div className={styles('comment-content')}>
          <header>
            <div className={styles('author-and-time')}>
              <strong>Renato Henrique</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Cerca de 1h atrás</time>
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