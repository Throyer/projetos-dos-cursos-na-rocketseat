import { ImgHTMLAttributes } from "react";
import classNames from "classnames";

import css from "./avatar.module.css";

import { createStyles } from "@utils/css-modules";

const styles = createStyles(css);

type AvatarProps = { border?: boolean; } & ImgHTMLAttributes<HTMLImageElement>

export const Avatar = ({ border, src, ...props }: AvatarProps) => {
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