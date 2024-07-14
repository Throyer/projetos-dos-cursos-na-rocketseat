import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar";
import { Post } from "./components/post/Post";

import css from "./app.module.css";

import { createStyles } from "./utils/css-modules-utils";

import posts from "./fake/posts.json"

const styles = createStyles(css);

export const App = () => {  
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
              publishedAt={new Date(publishedAt)}
            />
          ))}
        </main>
      </div>
    </div>
  )
}