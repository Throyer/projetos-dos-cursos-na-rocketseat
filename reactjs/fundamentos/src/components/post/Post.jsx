import css from "./post.module.css"

import { createStyles } from "../../utils/css-modules-utils"

import { Comment } from "../comment/comment";
import { Avatar } from "../avatar/avatar";

const Contents = {
  'paragraph': ({ id, content }) => (
    <p key={id}>{content}</p>
  ),
  'link': ({ id, content }) => (
    <p key={id}><a href="#">{content}</a></p>
  ),
}

const styles = createStyles(css);

export const Post = ({ author, content, comments }) => {
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

        <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Publicado há 1h</time>
      </header>

      <div className={styles('content')}>
        {content.map(({ type, ...content }) => Contents[type](content))}
      </div>

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
        {comments.map(({ id, content, likes }) => (
          <Comment key={id} content={content} likes={likes} />
        ))}
      </div>
    </article>
  )
}