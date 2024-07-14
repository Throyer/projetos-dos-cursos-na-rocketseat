import css from "./avatar.module.css";
import classNames from "classnames";

import { createStyles } from "../../utils/css-modules-utils";

const styles = createStyles(css);

export const Avatar = ({ border, src, ...props }) => {
  return (
    <img
      src={src}      
      className={classNames(
        styles('avatar'),
        { [styles('borders')]: border }
      )}
      {...props}
    />
  );
};