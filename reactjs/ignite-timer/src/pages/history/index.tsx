import { useCycles } from "../../contexts/cycles/use-cycles";
import { Time } from "./components/time";
import * as Styles from "./styles"

const Statuses = {
  'Concluído': 'green',
  'Em andamento': 'yellow',
  'Interrompido': 'red'
} as const

export const History = () => {
  const { cycles } = useCycles();

  return (
    <Styles.Container>
      <h1>Meu Histórico</h1>

      <Styles.Content>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(({ id, title, minutes_amount, started_at, status }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{minutes_amount} minutos</td>
                <td>
                  <Time when={new Date(started_at)} />
                </td>
                <td>
                  <Styles.Status
                    statusColor={Statuses[status as keyof typeof Statuses]}
                  >
                    {status}
                  </Styles.Status>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styles.Content>
    </Styles.Container>
  )
}