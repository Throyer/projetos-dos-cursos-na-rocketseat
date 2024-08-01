import { Input } from "../input"

export const TaskForm = () => {
  return (
    <form>
      <Input type="text" placeholder="Adicione uma nova tarefa" />
      <button>
        Criar
        <span>+</span>
      </button>
    </form>
  )
}