import React, { FC, useCallback, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import * as Yup from "yup";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";

import { LOGO } from "../../utils/assets";

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from "./styles";
import { getAllValidationErrors } from "../../utils/validations";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { goBack, navigate } = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData): Promise<
    void
  > => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Informe o nome."),
        email: Yup.string()
          .required("Informe o e-mail.")
          .email("Informe um e-mail válido."),
        password: Yup.string().min(6, "Minimo 6 dígitos"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post("/users", data);

      Alert.alert(
        "Cadastro realizado com sucesso.",
        "Você já pode fazer login."
      );

      goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getAllValidationErrors(error);
        formRef.current?.setErrors(errors);
      } else {
        Alert.alert(
          "Erro ao fazer cadastro",
          "Não foi possivel fazer o cadastro. Tente novamente mais tarde."
        );
      }
    }
  }, []);

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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => navigate("SignIn")}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
