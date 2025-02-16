import { MagnifyingGlass } from "@phosphor-icons/react";
import * as Styles from "./styles";

export const Search = () => {
  return (
    <Styles.Container>
      <input type="text" placeholder="Busque por transações" />
      
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </Styles.Container>
  )
}