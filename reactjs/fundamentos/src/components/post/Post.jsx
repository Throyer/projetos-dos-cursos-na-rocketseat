import css from "./post.module.css"

import { createStyles } from "../../utils/css-modules-utils"

import { Comment } from "../comment/comment";
import { Avatar } from "../avatar/avatar";
import { Time } from "../time/time";
import { Content } from "../content/content";

const styles = createStyles(css);

export const Post = ({ author, content, comments, publishedAt }) => {

  return (
    <article className={styles('post')}>
      <header>
        <div className={styles('author')}>
          <Avatar border src={author.avatar} />

          <div className={styles('author-info')}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <Time when={publishedAt} />
      </header>

      <Content content={content} />

      <form className={styles('comment-form')}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles('comment-list')}>
        {comments.map(({ id, content, likes, publishedAt }) => (
          <Comment key={id} content={content} likes={likes} publishedAt={publishedAt} />
        ))}
      </div>
    </article>
  )
}