import { ImgHTMLAttributes } from "react";

import css from "./avatar.module.css";

import classNames from "classnames";

import { createStyles } from "../../utils/css-modules-utils";

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