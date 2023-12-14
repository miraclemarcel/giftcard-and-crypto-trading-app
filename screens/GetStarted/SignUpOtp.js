import React, { useState } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { useTheme } from "../../contexts/theme.context";

import {
  StyledContainer,
  MainContainer,
  StyledFormArea,
  StyledTextInput,
  ButtonText,
  StyledButton,
  Colors,
  SignupOtpContent,
  SignupOtpText,
  MsgBox,
} from "../../styles/styles";

const { inputPlaceholder, backgroundColor } = Colors;

const SignUpOtp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", balance: "" });
  const { theme } = useTheme();

  const handleSubmit = async () => {
      navigation.navigate("MainContent")
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={theme.StatusBarBG} />
        <MainContainer>
          <SignupOtpContent>
            <SignupOtpText>Enter the OTP that was sent to you!</SignupOtpText>
          </SignupOtpContent>
          <Formik
            onSubmit={handleSubmit}
          >
            {({  handleSubmit, values, errors }) => (
              <StyledFormArea>
                <StyledTextInput
                  placeholder="* * * * * *"
                  placeholderTextColor={inputPlaceholder}
                  keyboardType="numeric"
                />
                

                <StyledButton
                  onPress={handleSubmit}
                  disabled={loading}
                  style={{ marginTop: 20 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ButtonText>VERIFY</ButtonText>
                  )}
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </MainContainer>
      </StyledContainer>
    </SafeAreaView>
  );
};

export default SignUpOtp;
