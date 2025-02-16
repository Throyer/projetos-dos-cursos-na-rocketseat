import { ArrowCircleDown, ArrowCircleUp, X } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog';

import * as Styles from "./styles";

export const CreateTransactionModal = () => {
  return (
    <Dialog.Portal>
      <Styles.Overlay />
      <Styles.Content>
        <Dialog.Title>
          Nova Transação
        </Dialog.Title>
        
        <Styles.Close>
          <X size={24} />
        </Styles.Close>

        <form>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Valor" required />
          <input type="text" placeholder="Categoria" required />

          <Styles.TypeContainer>
            <Styles.TypeButton type="button" variant="income">
              <ArrowCircleUp size={24} />
              Entrada
            </Styles.TypeButton>
            <Styles.TypeButton type="button" variant="outcome">
              <ArrowCircleDown size={24} />
              Saida
            </Styles.TypeButton>
          </Styles.TypeContainer>

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Styles.Content>
    </Dialog.Portal>
  );
}