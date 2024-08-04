import { useState, FormEvent } from "react";

import { PlusCircle } from '@phosphor-icons/react'

import { Input } from "@components/input"
import { createStyles } from "@utils/css-modules";

import { Task } from "@services/tasks/task";

import { Button } from "@components/button";

import css from "./form.module.scss";

const styles = createStyles(css);

interface FormProps {
  onCreate?: (task: Task) => void;
}

export const Form = ({ onCreate }: FormProps) => {

  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onCreate && title) {
      onCreate({
        id: String(new Date().getTime()),
        title,
        done: false,
      })
    }
  }

  return (
    <form className={styles("container")} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
      />
      <Button type="submit">
        Criar
        <PlusCircle size={16} color="#f2f2f2" weight="bold" />
      </Button>
    </form>
  )
}