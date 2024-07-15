import React, { FC, useEffect } from "react";

import { Container } from "./styles";
import { FiXCircle, FiAlertCircle, FiInfo, FiCheckCircle } from "react-icons/fi";
import { ToastMessage, useToast } from "../../../hooks/toast";

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo size={20} />,
    success: <FiCheckCircle size={20} />,
    danger: <FiAlertCircle size={20} />
}

const Toast: FC<ToastProps> = ({
    message: {
        id,
        type,
        title,
        description
    },
    style
}) => {

    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(id);
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, [removeToast, id])

    return (
        <Container
            hasDescription={!!description}
            style={style}
            type={type}
        >
            {icons[type || "info"]}

            <div>
                <strong>{title}</strong>
                {description && (
                    <p>{description}</p>
                )}
            </div>

            <button
                type="button"
                onClick={() => removeToast(id)}
            >
                <FiXCircle size={18} />
            </button>
        </Container>
    )
}

export default Toast;