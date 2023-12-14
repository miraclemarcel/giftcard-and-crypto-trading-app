import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useTheme } from "../../contexts/theme.context";

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  RightIcon,
  ButtonText,
  StyledButton,
  Colors,
  MsgBox,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  ScreenTitlesHeader,
} from "../../styles/styles";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  isValidPassword,
} from "../../util/validator";
import { useAuthentication } from "../../contexts/auth.context";

const { inputPlaceholder, backgroundColor } = Colors;

const Signup = () => {
  const navigation = useNavigation();
  const { error, loading } = useAuthentication();
  const { theme } = useTheme();


  const [messageType] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [data, setData] = useState({ name: "", email: "", username: "", phoneNumber: "", password: "", passConfirm: "" });

  const handleSignup = async () => {
    navigation.navigate("SignUpAuth", data);
  };

  return ( 
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer>
          <StatusBar style="light" backgroundColor={theme.StatusBarBG} />
          <InnerContainer>
            <ScreenTitlesHeader />
            <StyledFormArea>
              <StyledTextInput
                placeholder="Full name"
                placeholderTextColor={inputPlaceholder}
                value={data.name}
                keyboardType="default"
              />
              <StyledTextInput
                placeholder="Username"
                placeholderTextColor={inputPlaceholder}
                value={data.username}
                keyboardType="default"
              />
              <StyledTextInput
                placeholder="Email"
                placeholderTextColor={inputPlaceholder}
                value={data.email}
                keyboardType="email-address"
              />
              <StyledTextInput
                placeholder="Phone number"
                placeholderTextColor={inputPlaceholder}
                value={data.phoneNumber}
                keyboardType="numeric"
              />
              <MyTextInput
                placeholder="Password"
                placeholderTextColor={inputPlaceholder}
                value={data.password}
                secureTextEntry={hidePassword} 
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />
              <MyTextInput
                placeholder="Confirm password"
                placeholderTextColor={inputPlaceholder}
                value={data.passConfirm}
                secureTextEntry={hideConfirmPassword}
                togglePasswordVisibility={() =>
                  setHideConfirmPassword(!hideConfirmPassword)
                }
              />
              <MsgBox type={messageType}></MsgBox>
              {!loading ? (
                <StyledButton onPress={handleSignup}>
                  <ButtonText>CREATE ACCOUNT</ButtonText>
                </StyledButton>
              ) : (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={inputPlaceholder} />
                </StyledButton>
              )}
              <ToSignupPageBox>
                <ToSignupPageText>Already have an account? </ToSignupPageText>
                <TextLink onPress={() => navigation.navigate("Login")}>
                  <TextLinkContent>Login</TextLinkContent>
                </TextLink>
              </ToSignupPageBox>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const MyTextInput = ({ icon, togglePasswordVisibility, ...props }) => {
  return (
    <View>
      <StyledTextInput {...props} />
      {props.value.length > 0 && (
        <RightIcon onPress={togglePasswordVisibility}>
          <Octicons
            name={props.secureTextEntry ? "eye-closed" : "eye"}
            size={17}
            color={inputPlaceholder}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
