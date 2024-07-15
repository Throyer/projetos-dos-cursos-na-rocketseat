import React, { FC, useCallback, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { LOGO } from "../../utils/assets";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styles";
import { getAllValidationErrors } from "../../utils/validations";
import { useSession } from "../../hooks/session";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { navigate } = useNavigation();
  const { signIn } = useSession();

  const handleSignIn = useCallback(async (data: SignInFormData): Promise<
    void
  > => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Informe o e-mail.")
          .email("Informe um e-mail válido."),
        password: Yup.string().required("Informe a senha"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      await signIn({
        email,
        password,
      });
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getAllValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        Alert.alert("Erro ao fazer login", "Senha ou usuario icorretos.");
      }
    }
  }, [signIn]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={LOGO} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>

            <ForgotPassword onPress={() => console.log("pressionou")}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar um conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
