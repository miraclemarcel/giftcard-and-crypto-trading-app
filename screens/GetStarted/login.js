import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";



// Import styles and constants from another file
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  ButtonText,
  StyledButton,
  Colors,
  ToSignupPageBox,
  ToSignupPageText,
  TextLink,
  TextLinkContent,
  RightIcon,
} from "../../styles/styles";
import { useAuthentication } from "../../contexts/auth.context";
import { useTheme } from "../../contexts/theme.context";

// Destructure constants from the Colors object
const { inputPlaceholder, backgroundColor, success, danger } = Colors;

// Define the Login component

const Login = ({ navigation }) => {

  const [hidePassword, setHidePassword] = useState(true);
  const [data, setData] = useState({ email: "", password: ""});
  const { signin, error, loading, setError } = useAuthentication();
  const { theme } = useTheme();

  const handleSignin = async () => {
    navigation.navigate('MainContent');
  }


  return (
   
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={theme.StatusBarBG} />
        <InnerContainer>
          <StyledFormArea>
            <StyledTextInput
              placeholder="Enter email"
              placeholderTextColor={inputPlaceholder}
              value={data.email}
            />
               <MyTextInput
                placeholder="Password"
                placeholderTextColor={inputPlaceholder}
                value={data.password}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
              />

            {/* ==========Button========= */}
            {!loading ? (
              <StyledButton onPress={handleSignin}>
                <ButtonText>LOG IN</ButtonText>
              </StyledButton>
            ) : (
              <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={inputPlaceholder} />
              </StyledButton>
            )}
            <ToSignupPageBox>
              <ToSignupPageText>
                Don't have an account already?
              </ToSignupPageText>
              <TextLink onPress={() => navigation.navigate("Signup")}>
                <TextLinkContent>Signup</TextLinkContent>
              </TextLink>
            </ToSignupPageBox>
            <TextLink onPress={() => navigation.navigate("ResetOptions")}>
              <TextLinkContent>Reset Password</TextLinkContent>
            </TextLink>
          </StyledFormArea>
        </InnerContainer>
      </StyledContainer>

   

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

// MyTextInput component

export default Login;
