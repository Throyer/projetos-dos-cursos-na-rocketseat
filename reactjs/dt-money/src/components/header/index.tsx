import * as Dialog from "@radix-ui/react-dialog";

import { IGNITE_LOGO_SVG } from "@assets/ignite";
import * as Styles from "./styles";
import { CreateTransactionModal } from "@components/create-transaction-modal";

export const Header = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <img src={IGNITE_LOGO_SVG}/>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Styles.Button>Nova transação</Styles.Button>
          </Dialog.Trigger>

          <CreateTransactionModal />
        </Dialog.Root>
      </Styles.Content>
    </Styles.Container>
  )
}