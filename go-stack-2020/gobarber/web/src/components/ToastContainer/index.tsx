import React, { FC } from "react";
import { useTransition } from "react-spring";

import { ToastMessage } from "../../hooks/toast";
import Toast from "./Toast";

import { Container } from "./styles";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: FC<ToastContainerProps> = ({ messages }) => {

    const transitions = useTransition(messages, ({ id }) => id, {
        from: { right: "-120%", opacity: 0 },
        enter: { right: "0%", opacity: 1 },
        leave: { right: "-120%", opacity: 0 }
    })

    return (
        <Container>
            {transitions.map(({ item, key, props }) => (
                <Toast 
                    key={key}
                    style={props}
                    message={item}
                />
            ))}
        </Container>
    );
}

export default ToastContainer;