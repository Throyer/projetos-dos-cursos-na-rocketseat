import { Header } from "./components/header/header"
import { Sidebar } from "./components/sidebar/sidebar"
import { Post } from "./components/post/Post"

import styles from "./app.module.css"

export const App = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Cicrano"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <Post
            author="Beurtrano"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </main>
      </div>
    </div>
  )
}