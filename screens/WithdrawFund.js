import React from "react";
import { useFormik } from "formik";
import Modal from "react-native-modal";
import { withdraw } from "../util/auth";
import { StatusBar } from "expo-status-bar";
import WithdrawFunPin from "./WithdrawFunPin";
import { Octicons } from "@expo/vector-icons";
import { useBank } from '../contexts/bank.context';
import { useAuthentication } from "../contexts/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Animated, StyleSheet, Modal as RNModal, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from "react-native";


import { 
  StyledContainer,
  Colors,
  MainContainer,
  BalanceContainer,
  BalanceTitle,
  Balance,
  NairaIcon,
  BalanceAmount,
  StyledFormArea,
  StyledTextInputLabel,
  StyledTextInput,
  MsgBox,
  StyledButton,
  ButtonText,
  AddedBankInfo,
  ItemName,
  NoBankAlert,
  NoBankAlertText,
  AddBankButton,
  AddBankButtonText,
  SuccessAlertModal,
  AlertModalIcon,
  CheckIcon,
  AlertModalText,
  AlertModalTextSpan,
  ScreenTitles,
  AddBankAlert,
  AddBankAlertText

} from "../styles/styles";





const { backgroundColor, inputPlaceholder, white } = Colors;









const WithdrawFund = ({ navigation: { navigate } }) => {
  const { bank, get, loading } = useBank();
  const { user, setUser } = useAuthentication();
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = React.useState(false);
  const [isWithdrawPinVissible, setWithdrawPinVissible] = React.useState(false);

  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!bank) get();
  }, []);

  React.useEffect(() => {
    Animated.timing(scale, {
      duration: 4000,
      toValue: +visible,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleSelectedAccount = () => {
    setVisible(false);
    setSelectedBank(bank?.AccountNumber);
  }

  const toggleWidrawPinModal = () => {
    setWithdrawPinVissible(!isWithdrawPinVissible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!isSuccessModalVisible);
  };

  const formik = useFormik({
    initialValues: { amount: "" },
    onSubmit: async (values) => {
      try {
        setIsButtonDisabled(true);
        const balance = parseFloat(String(user?.wallet_Balance).replace(/,/g, ""));
        console.log(balance);
        if (values.amount > balance) {
          throw Error("Insufficient balance");
        }
        if (values.amount < balance) setErrorMessage("");
        const result = await withdraw(values);
        console.log(result);
        if (result.status === "success") {
          toggleSuccessModal();
          setUser(prev => ({ ...prev, wallet_Balance: result.wallet_Balance }))
        }
      } catch (error) {
        setErrorMessage("check your intenet and try again");
      } finally {
        setIsButtonDisabled(false);
      }
    }
  });

  const valid = React.useMemo(() => Boolean(formik.values.amount.length && selectedBank.length), [formik.values, selectedBank]);

  const handleWithdraw = async (pin) => {
    try {
      let res = await withdraw({ pin, ...formik.values });
      if (res.status !== 'success') throw new Error(res.message);

      setUser((prev = {}) => ({ ...prev, wallet_Balance: res?.wallet_Balance }));
      setWithdrawPinVissible(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message || error);
    };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitles>Withdraw Fund</ScreenTitles>
          <BalanceContainer>
            <BalanceTitle>Account Balance</BalanceTitle>
            <Balance>
              <NairaIcon />
              <BalanceAmount>{user?.wallet_Balance}</BalanceAmount>
            </Balance>
          </BalanceContainer>
          <StyledFormArea>
            <StyledTextInputLabel>Amount</StyledTextInputLabel>
            <StyledTextInput
              placeholder="Enter amount here"
              placeholderTextColor={inputPlaceholder}
              onChangeText={formik.handleChange("amount")}
              onBlur={formik.handleBlur("amount")}
              value={formik.values.amount}
              keyboardType="numeric"
            />
            <StyledTextInputLabel>Bank Account</StyledTextInputLabel>
            <TouchableOpacity onPress={() => setVisible(prev => !prev)}>
              <StyledTextInput
                placeholder="Choose bank"
                placeholderTextColor={inputPlaceholder}
                value={selectedBank}
                editable={false}
              />
            </TouchableOpacity>
            <MsgBox>{errorMessage}</MsgBox>
            <StyledButton
              disabled={isButtonDisabled}
              onPress={valid ? toggleWidrawPinModal : null}
            >
              {isButtonDisabled ? <ActivityIndicator size={"large"} /> : <ButtonText>WITHDRAW</ButtonText>}
            </StyledButton>
          </StyledFormArea>
        </MainContainer>
      </StyledContainer>

      <RNModal transparent visible={visible}>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.container}>
              {loading ? (
                <ActivityIndicator size='large' />
              ) : bank ? (
                <View style={styles.wrapper}>
                  <AddedBankInfo onPress={handleSelectedAccount}>
                    <View>
                      <ItemName inputPlaceholder="white">{bank?.AccountNumber}</ItemName>
                      <ItemName inputPlaceholder="white">{bank?.BankName}</ItemName>
                    </View>
                  </AddedBankInfo>
                </View>
              ) : (
                <AddBankAlert>
                  <AddBankAlertText>No account added yet</AddBankAlertText>
                  <AddBankButton onPress={() => { setVisible(false); navigate("ChooseBank"); }}>
                    <AddBankButtonText>Add Bank Now</AddBankButtonText>
                  </AddBankButton>
                </AddBankAlert>
              )}
            </View>
          </TouchableWithoutFeedback>
          </RNModal>


    

      <Modal
        isVisible={isWithdrawPinVissible}
        style={{ margin: 0 }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <WithdrawFunPin withdraw={handleWithdraw} toggleWidrawPinModal={toggleWidrawPinModal} />
      </Modal>

      <Modal
        isVisible={isSuccessModalVisible}
        style={{ margin: 0 }}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <SuccessAlertModal>
          <AlertModalIcon onPress={toggleSuccessModal}>
            <Octicons name="x" size={30} color={white} />
          </AlertModalIcon>
          <CheckIcon source={require("./../assets/icons/check.png")} />
          <AlertModalText>Your transaction is processing!</AlertModalText>
          <AlertModalTextSpan>
            You will be notified once your transaction is complete.
          </AlertModalTextSpan>
        </SuccessAlertModal>
      </Modal>

    </SafeAreaView>
  );
};

export default WithdrawFund;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  wrapper: {
    padding: 15,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
});
