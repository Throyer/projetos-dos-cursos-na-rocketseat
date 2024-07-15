import { FormEvent, ChangeEvent, useState, InvalidEvent } from "react";

import css from "./post.module.css"

import { createStyles } from "@utils/css-modules"

import { Comment } from "@components/comment/comment";
import { Avatar } from "@components/avatar/avatar";
import { Time } from "@components/time/time";
import { Content } from "@components/content/content";

import { Author } from "@models/author";
import { Content as ContentModel } from "@models/content";
import { Comment as CommentModel } from "@models/comment";

const styles = createStyles(css);

const me: Author = {
  name: "Renato Henrique",
  avatar: "https://github.com/throyer.png",
  role: "Desenvolvedor Senior"
}

type PostProps = {
  author: Author
  content: ContentModel[];
  comments: CommentModel[];
  publishedAt: Date;
}

export const Post = ({ author, content, comments: initialComments, publishedAt }: PostProps) => {
  const [comments, setComments] = useState<CommentModel[]>(initialComments);
  const [comment, setComment] = useState('');

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    const newComment = {
      id: new Date().getTime().toString(),
      author: me,
      content: comment,
      likes: 0,
      publishedAt: new Date()
    }

    setComments((state => [...state, newComment]))
    setComment('');
  };

  const handleCommentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
    target.setCustomValidity('');
  }

  const handleDeleteComment = (deleted: string) => {
    setComments((state) => state.filter(comment => comment.id !== deleted))
  }

  const handleCommentInvalid = ({ target }: InvalidEvent<HTMLTextAreaElement>) => {
    target.setCustomValidity('Forneça o comentario.')
  }

  const isCommentEmpty = comment.length === 0;

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

      <form
        onSubmit={handleCreateNewComment}
        className={styles('comment-form')}
      >
        <strong>Deixe seu feedback</strong>

        <textarea
          required
          name="comment"
          value={comment}
          placeholder="Deixe um comentário"
          onInvalid={handleCommentInvalid}
          onChange={handleCommentChange}
        />

        <footer>
          <button
            type="submit"
            disabled={isCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles('comment-list')}>
        {comments.map(({ id, author, content, likes, publishedAt }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            content={content}
            likes={likes}
            publishedAt={publishedAt}
            onDelete={(id) => handleDeleteComment(id)}
          />
        ))}
      </div>
    </article>
  )
}