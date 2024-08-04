import { PlusCircle } from '@phosphor-icons/react'

import { Input } from "../../../../components/input"
import { createStyles } from "../../../../utils/css-modules";

import css from "./form.module.scss";
import { Button } from "../../../../components/button";

const styles = createStyles(css);

export const Form = () => {
  return (
    <form className={styles("container")} onSubmit={(event) => event.preventDefault()}>
      <Input
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <Button type="submit">
        Criar
        <PlusCircle size={16} color="#f2f2f2" weight="bold" />
      </Button>
    </form>
  )
}