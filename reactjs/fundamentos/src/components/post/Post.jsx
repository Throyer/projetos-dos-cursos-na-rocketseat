import css from "./post.module.css"

import { createStyles } from "../../utils/css-modules-utils"

import { Comment } from "../comment/comment";

const styles = createStyles(css);

export const Post = () => {
  return (
    <article className={styles('post')}>
      <header>
        <div className={styles('author')}>
          <img src="https://github.com/throyer.png" />

          <div className={styles('author-info')}>
            <strong>Renato Henrique</strong>
            <span>Desenvolvedor Senior.</span>
          </div>
        </div>

        <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Publicado há 1h</time>
      </header>

      <div className={styles('content')}>
        <p>Fala galeraa</p>
        <p>joojh</p>
        <p>Batata</p>
        <p>Fala galeraa </p>
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
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}