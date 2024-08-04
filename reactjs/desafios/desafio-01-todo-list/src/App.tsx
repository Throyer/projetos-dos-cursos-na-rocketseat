import { Header } from "@components/header";
import { Tasks } from "@pages/tasks";
import { findAll } from "@services/tasks";

export const App = () => {
  const page = findAll();
  return (
    <main>
      <Header />
      <Tasks tasks={page.content} />
    </main>
  )
}
