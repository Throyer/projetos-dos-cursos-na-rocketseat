import React, { FC, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';

import * as Yup from "yup";

import { LOGO } from '../../utils/assets';
import { useToast } from '../../hooks/toast';
import { getAllValidationErrors } from '../../utils/validations';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignFormData): Promise<void> => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup
                    .string()
                    .required("Informe o nome."),
                email: Yup
                    .string()
                    .required("Informe o e-mail.")
                    .email("Informe um e-mail válido."),
                password: Yup
                    .string()
                    .min(6, "Minimo 6 dígitos")
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post("/users", data);

            history.push("/");

            addToast({
                type: "success",
                title: "Sucesso",
                description: "Você ja pode fazer logon no go barber"
            });

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errors = getAllValidationErrors(error);
                formRef.current?.setErrors(errors);
            } else {
                addToast({
                    title: "Erro ao fazer cadastro",
                    description: "Ocorreu um erro no cadastro, tente novamente.",
                    type: "danger"
                });
            }
        }
    }, [addToast, history]);

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={LOGO} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input
                            icon={FiUser}
                            name="name"
                            placeholder="Nome"
                        />

                        <Input
                            icon={FiMail}
                            name="email"
                            placeholder="E-mail"
                        />

                        <Input
                            icon={FiLock}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />

                        <Button type="submit">
                            Cadastrar
                        </Button>

                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
};

export default SignUp;
