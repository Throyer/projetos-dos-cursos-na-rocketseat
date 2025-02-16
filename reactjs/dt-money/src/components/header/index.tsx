import { IGNITE_LOGO_SVG } from "@assets/ignite";
import * as Styles from "./styles";

export const Header = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <img src={IGNITE_LOGO_SVG}/>
        <Styles.Button>Nova transação</Styles.Button>
      </Styles.Content>
    </Styles.Container>
  )
}