import React, { useState, useEffect } from "react";
import { api, refer } from "../util/auth";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from 'expo-clipboard';

// ======icon==============
import { Ionicons } from "@expo/vector-icons";
//////components--------
import {
  Colors,
  ButtonText,
  ScreenTitles,
  MainContainer,
  CryptoCopyBtn,
  StyledContainer,
  GenerateCryptoIcon,
  CryptoAddressInput,
  GenerateCryptoTitle,
  CryptoInputContainer,
  GenerateCryptoDetails,
  GenerateCryptoContainer,
  AlertPopUpMessage,
  AlertPopUpText,
} from "../styles/styles";

const { inputPlaceholder, backgroundColor, success, danger, white } = Colors;

const Referral = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referLink, setReferLink] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    if (data && data?.active) {
      (async () => {
        setLoading(true);

        const res = await refer();
        setReferLink(res.link);

        setLoading(false);
      })();
    }
  }, [data]);

  const fetch = async () => {
    setLoading(true);
    try {
      let res = await api.get('Admin/ReferralRate');
      if (res.data?.status !== 'success') throw new Error('Something went wrong');

      setData(res.data);
    } catch (err) {
      console.error(err);
    }; setLoading(false);
  };

  const handleCopyLink = () => {
    Clipboard.setString(referLink);
    setShowAlert(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Referral</ScreenTitles>
          {loading ? <ActivityIndicator /> : data?.active ? <GenerateCryptoContainer>
            <GenerateCryptoIcon
              source={require("../assets/icons/cryptowallet.png")}
            />
            <GenerateCryptoTitle>
              Refer your friends and get N{data?.refRate}
            </GenerateCryptoTitle>
            <GenerateCryptoDetails>
              Earn referral bonus when your friends signs up {"\n"} and trade
              successfully.
            </GenerateCryptoDetails>
            <CryptoInputContainer>
            <CryptoAddressInput editable={false} placeholder={referLink} placeholderTextColor={white} />
      
              <CryptoCopyBtn onPress={handleCopyLink}>
                <ButtonText>Copy</ButtonText>
              </CryptoCopyBtn>
            
            </CryptoInputContainer>
          </GenerateCryptoContainer> : <Text>No referral program going on</Text>}
        </MainContainer>
      </StyledContainer>

      {/* =============alert messages================ */}

      {showAlert && (
        <AlertPopUpMessage>
          <Ionicons name="checkmark-circle" size={20} color={success} />
          <AlertPopUpText>Referral link has been copied</AlertPopUpText>
        </AlertPopUpMessage>
      )}
      
    </SafeAreaView>
  );
};

export default Referral;
