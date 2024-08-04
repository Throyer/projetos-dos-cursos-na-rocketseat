import { Check, Trash } from "@phosphor-icons/react"

import classNames from "classnames";

import { createStyles } from "../../../../utils/css-modules";

import css from "./item.module.scss";

const styles = createStyles(css);

export interface ItemProps {
  title: string;
  done: boolean;
  onRemove?: () => void;
  onChange?: (done: boolean) => void;
}

export const Item = ({ title, done, onRemove, onChange }: ItemProps) => {

  const handleRemove = () => {
    onRemove && onRemove();
  }

  const handleToggle = () => {    
    onChange && onChange(!done);
  }

  return (
    <div className={styles("container")}>
      <div>
        <label onClick={handleToggle} htmlFor="checkbox">
          <input
            type="checkbox"
            readOnly
            checked={done}
          />

          <span className={classNames(
            styles("checkbox"),
            {
              [styles("checkbox-checked")]: done,
              [styles("checkbox-unchecked")]: !done
            }
          )}>
            {done && <Check size={12} />}
          </span>

          <p className={classNames(
            styles("paragraph"),
            { [styles("paragraph-checked")]: done }
          )}>
            {title}
          </p>
        </label>
      </div>
      <button onClick={handleRemove}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}