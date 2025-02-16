import { Header } from "@components/header";
import { Summary } from "@components/summary";

import * as Styles from "./styles";
import { Search } from "./components/search-form";

export const Transactions = () => {
  return (
    <div>
      <Header />
      <Summary />
      <Styles.Container>
        <Search />
        <Styles.Transactions>
          <tbody>
            <tr>
              <td width="50%">Venda do carro</td>
              <td>
                <Styles.PriceHighlight variant="income">
                  R$ 17.410,00
                </Styles.PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Venda do carro</td>
              <td>
                <Styles.PriceHighlight variant="outcome">
                  -R$ 17.400,00
                </Styles.PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
          </tbody>
        </Styles.Transactions>
      </Styles.Container>
    </div>
  )
}