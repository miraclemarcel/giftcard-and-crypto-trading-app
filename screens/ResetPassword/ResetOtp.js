import { Formik } from "formik";
import React, { useState } from "react";
import { resetPasswordOTP } from "../../util/auth";
import { StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
} from "../../styles/styles";

const { inputPlaceholder, backgroundColor } = Colors;

const ResetOtp = ({ navigation, route: { params: { text = '' } } }) => {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleOtpVerification = async (value) => {
    console.log(value);
    try {
      setLoading(true);
      const response = await resetPasswordOTP(value.otp);
      if (response.status === 'success') navigation.navigate("CreateNewPassword")
      if (response === 'No user found') console.log('errrrrrrrrrrprrororororo'); // handle error if otp is not coreect
      console.log(response)
    } catch (error) {
      console.log('SSerrrrrr'); // handle network error 
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={theme.StatusBarBG} />
        <MainContainer>
          <SignupOtpContent>
            <SignupOtpText>Enter the OTP that was sent to you!</SignupOtpText>
          </SignupOtpContent>
          <Formik initialValues={{ otp: "" }} onSubmit={handleOtpVerification}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <StyledFormArea>
                <StyledTextInput
                  placeholder="* * * * * *"
                  placeholderTextColor={inputPlaceholder}
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  value={values.otp}
                  keyboardType="numeric"
                />
                <StyledButton
                  onPress={handleSubmit}
                  disabled={loading}
                  style={{ marginTop: 20 }}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size={"large"} />
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

export default ResetOtp;