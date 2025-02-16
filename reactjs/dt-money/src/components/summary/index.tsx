import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "@phosphor-icons/react";
import * as Styles from "./styles";

export const Summary = () => {
  return (
    <Styles.Container>
      <Styles.Card>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>
        <strong>R$ 17.410,00</strong>
      </Styles.Card>
      <Styles.Card>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>
        <strong>R$ 17.400,00</strong>
      </Styles.Card>
      <Styles.Card variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>R$ 10,00</strong>
      </Styles.Card>
    </Styles.Container>
  )
}