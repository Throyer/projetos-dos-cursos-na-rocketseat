import { ArrowCounterClockwise, HandPalm, Trash } from "@phosphor-icons/react";
import { useCycles } from "../../contexts/cycles/use-cycles";
import { Time } from "./components/time";
import * as Styles from "./styles";

const Statuses = {
  'Concluído': 'green',
  'Em andamento': 'yellow',
  'Interrompido': 'red'
} as const

export const History = () => {
  const {
    cycles,
    currentCycle,
    removeCycle,
    interruptCurrentCycle,
    restartCycle
  } = useCycles();

  const handleRemoveCycle = (id: string) => {
    removeCycle(id);
  };

  const handleRestartCycle = (id: string) => {
    restartCycle(id)
  };

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.title}</td>
                <td>{cycle.minutes_amount} minutos</td>
                <td>
                  <Time when={new Date(cycle.started_at)} />
                </td>
                <td>
                  <Styles.Status
                    statusColor={Statuses[cycle.status as keyof typeof Statuses]}
                  >
                    {cycle.status}
                  </Styles.Status>
                </td>
                <td>
                  <Styles.ButtonSuccess
                    disabled={cycle.status === 'Concluído' || cycle.status == 'Em andamento' || Boolean(currentCycle)}
                    onClick={() => handleRestartCycle(cycle.id)}
                  >
                    <ArrowCounterClockwise size={16} color="#808080" />
                  </Styles.ButtonSuccess>

                  <Styles.ButtonDanger
                    disabled={cycle.status == 'Concluído' || cycle.status === 'Interrompido'}
                    onClick={interruptCurrentCycle}
                  >
                    <HandPalm size={16} color="#808080" />
                  </Styles.ButtonDanger>

                  <Styles.ButtonDanger
                    disabled={cycle.status === 'Em andamento'}
                    onClick={() => handleRemoveCycle(cycle.id)}
                  >
                    <Trash size={16} color="#808080" />
                  </Styles.ButtonDanger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Styles.Content>
    </Styles.Container>
  )
}