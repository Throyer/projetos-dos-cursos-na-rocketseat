import * as Styles from "./styles"

const Statuses = {
  'Concluído': 'green',
  'Em andamento': 'yellow',
  'Pendente': 'red'
} as const

const FAKE_ITENS = [
  {
    "id": 1,
    "title": "Tarefa 1",
    "started_at": "Há cerca de duas horas",
    "status": "Concluído"
  },
  {
    "id": 2,
    "title": "Tarefa 2",
    "started_at": "Há cerca de três horas",
    "status": "Em andamento"
  },
  {
    "id": 3,
    "title": "Tarefa 3",
    "started_at": "Há cerca de uma hora",
    "status": "Pendente"
  },
  {
    "id": 4,
    "title": "Tarefa 4",
    "started_at": "Há cerca de duas horas",
    "status": "Concluído"
  },
  {
    "id": 5,
    "title": "Tarefa 5",
    "started_at": "Há cerca de três horas",
    "status": "Em andamento"
  },
];

export const History = () => {
  return (
    <Styles.Container>
      <h1>Meu Historico</h1>

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
            {FAKE_ITENS.map(({ id, title, started_at, status }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>20 minutos</td>
                <td>{started_at}</td>
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