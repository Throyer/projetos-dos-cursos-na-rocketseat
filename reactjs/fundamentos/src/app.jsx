import css from "./app.module.css";

import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar";
import { Post } from "./components/post/Post";

import { createStyles } from "./utils/css-modules-utils";

import { findAllPosts } from "./services/posts/post-api";

const styles = createStyles(css);

export const App = () => {
  const posts = findAllPosts();

  return (
    <div>
      <Header />
      <div className={styles('wrapper')}>
        <Sidebar />
        <main>
          {posts.map(({ id, author, content, publishedAt, comments }) => (
            <Post
              key={id}
              author={author}
              content={content}
              comments={comments}
              publishedAt={publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}