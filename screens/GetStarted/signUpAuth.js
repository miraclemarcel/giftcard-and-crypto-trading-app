import React, { useState, useEffect } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/theme.context";

import {
  StyledContainer,
  MainContainer,
  ButtonText,
  StyledButton,
  SignupOtpText,
  SignupOtpContent,
} from "../../styles/styles";

const SignUpAuth = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [chosenOption, setChosenOption] = useState("Number");
  const { theme } = useTheme();

  const { email, phoneNumber } = route.params;

  const options = [
    { label: `Number: ${phoneNumber}`, value: "Number" },
    { label: `Email: ${email}`, value: "Email" },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    if (phoneNumber) {
      setChosenOption("Number");
    } else if (email) {
      setChosenOption("Email");
    }
  }, [phoneNumber, email]);

  const sendOTP = () => {
        navigation.navigate("SignUpOtp", { phoneNumber });
  };

  return (
    <StyledContainer>
      <StatusBar style="light" backgroundColor={theme.StatusBarBG} />
      <MainContainer>
        <SignupOtpContent>
          <SignupOtpText>
            A verification code would be sent to you to verify your account.
            Choose your preferred destination
          </SignupOtpText>
        </SignupOtpContent>

        <RadioForm
          radio_props={options}
          onPress={(value) => {
            setChosenOption(value);
          }}
          buttonSize={10}
          buttonColor={"#1350E8"}
          selectedButtonColor={"#1350E8"}
          labelStyle={{
            fontSize: 16,
            color: "#8B9CC8",
          }}
        />

        <StyledButton
          style={{ marginTop: 20 }}
          onPress={sendOTP.bind(null, chosenOption)}
          disabled={loading} 
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ButtonText>CONTINUE</ButtonText>
          )}
        </StyledButton>
      </MainContainer>
    </StyledContainer>
  );
};

export default SignUpAuth;
