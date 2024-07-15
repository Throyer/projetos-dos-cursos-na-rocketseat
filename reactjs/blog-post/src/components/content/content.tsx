import css from "./content.module.css"

import { createStyles } from "@utils/css-modules"
import { Content as ContentModel } from "@models/content";

const styles = createStyles(css);

type ContentProps = {
  content: ContentModel[]
};

export const Content = ({ content }: ContentProps) => {
  const elements = {
    'paragraph': ({ id, content }: Pick<ContentModel, "id"|"content">) => (
      <p key={id}>{content}</p>
    ),
    'link': ({ id, content }: Pick<ContentModel, "id"|"content">) => (
      <p key={id}><a href="#">{content}</a></p>
    ),
  }

  return (
    <div className={styles('content')}>
      {content.map(({ type, ...content }) => elements[type](content))}
    </div>
  )
}