import css from "./content.module.css"

import { createStyles } from "../../utils/css-modules-utils"

const styles = createStyles(css);

export const Content = ({ content }) => {
  const elements = {
    'paragraph': ({ id, content }) => (
      <p key={id}>{content}</p>
    ),
    'link': ({ id, content }) => (
      <p key={id}><a href="#">{content}</a></p>
    ),
  }

  return (
    <div className={styles('content')}>
      {content.map(({ type, ...content }) => elements[type](content))}
    </div>
  )
}