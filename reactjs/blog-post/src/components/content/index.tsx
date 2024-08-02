import Markdown from 'react-markdown';

import { PrismLight } from 'react-syntax-highlighter';

import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import css from "./content.module.css";

import { createStyles } from "@utils/css-modules";

const styles = createStyles(css);

export const Content = ({ content }: { content: string }) => {
  css.content
  return (
    <div className={styles('content')}>
      <Markdown components={{ code({ node, className, ...props }) {
        const lang = /language-(\w+)/.exec(className || '');
            
        return lang ? (
          <PrismLight
            style={oneDark}
            language={lang[1]}
            className="codeStyle"
            showLineNumbers={true}
            useInlineStyles={true}
          >
            {String(props.children).replace(/\n$/, '')}
          </PrismLight>
        ) : (
          <code className={className} {...props} />
        )
      }}}>
        {content}
      </Markdown>
    </div>
  );
}