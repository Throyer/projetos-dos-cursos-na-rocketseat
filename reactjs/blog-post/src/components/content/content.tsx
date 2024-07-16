import css from "./content.module.css"

import Markdown from 'react-markdown'

import { createStyles } from "@utils/css-modules"

const styles = createStyles(css);

export const Content = ({ content }: { content: string }) => {
  return (
    <div className={styles('content')}>
      <Markdown>
        {content}
      </Markdown>
    </div>
  );
}