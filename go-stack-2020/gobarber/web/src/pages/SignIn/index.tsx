import React, { FC, useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import { LOGO } from '../../utils/assets';

import { Form } from "@unform/web";
import { FormHandles } from '@unform/core';

import * as Yup from "yup";

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useSession } from "../../hooks/session";
import { useToast } from "../../hooks/toast";

import { getAllValidationErrors } from '../../utils/validations';

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: FC = () => {

    const { signIn } = useSession();
    const { addToast } = useToast();

    const history = useHistory();

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: SignInFormData): Promise<void> => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup
                    .string()
                    .required("Informe o e-mail.")
                    .email("Informe um e-mail válido."),
                password: Yup
                    .string()
                    .required("Informe a senha")
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const { email, password } = data;

            await signIn({
                email,
                password
            });

            history.push("/dashboard");

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errors = getAllValidationErrors(error);
                formRef.current?.setErrors(errors);
            } else {
                addToast({
                    title: "Erro ao fazer login",
                    description: "Senha ou usuario icorretos.",
                    type: "danger"
                });
            }
        }

    }, [history, signIn, addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>                    
                    <img src={LOGO} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>

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
                            Entrar
                        </Button>

                        <a href="forgot">
                            Esqueci minha senha
                        </a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
