import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native"; 
import Modal from "react-native-modal";

// ======icon==============
import { Octicons } from "@expo/vector-icons";

import {
  StyledContainer,
  StyledButton,
  ButtonText,
  Colors,
  MainContainer,
  ScreenTitles,
  StyledFormArea,
  StyledTextInput,
  StyledTextInputLabel,
  RateEntryText,
  ContentMarginTop,
  FooterText,
  ShortModalContainer,
  ShortModal,
  ShortModalTitle,
  ShortModalItemName,
  CloseButton,
  ShortModalHeading,
  ShortModalItemContainer,
  SuccessAlert,
  AlertText,
  AlertIcon,
  DoubleInput,
  SmallLeftInput,
  RightSmallInput,
  NairaText,
  RateItemsContent,
  RateItemContainer,
  RateContainer,
  ScreenTitlesHeader,
} from "../../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { giftCardRateCalc, rateAlert } from "../../util/auth";
// import { ScrollView } from "react-native-gesture-handler";

const { backgroundColor, inputPlaceholder, white, success } = Colors;



const RateAlertForm = ({ navigation }) => {
  const [isCardCategoryModalVisible, setCardCategoryModalVisible] = useState(false);
  const [isCardSubCategoryModalVisible, setCardSubCategoryModalVisible] = useState(false);
  const [isNotifyViaModalVisible, setNotifyViaModalVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedNotifyMethod, setSelectedNotifyMethod] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRate, setSelectedRate] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [userData, setUserData] = useState({
    selectedCategory: "",
    selectedSubCategory: "",
    priceTarget: 0,
    rate: '',
    asset: 'Gift Card',
    selectedNotifyMethod: '',
    selectedRate: '',
    enteredAmount: '',
  });

  const [cardCartegory, setCardCategory] = useState([]);
  const [cardSubCartegory, setCardSubCardCategory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await giftCardRateCalc()
        const data = response.rates[0]
        setCardCategory(data.gitCard_Cartigories)
        setCardSubCardCategory(data.gitCardSub_Cartigories)
      } catch (error) {
        console.log(error)
      }

    }
    fetch()
  }, [])

  const toggleCardCategoryModal = () => {
    setCardCategoryModalVisible(!isCardCategoryModalVisible);
  };

  const toggleCardSubCategoryModal = () => {
    setCardSubCategoryModalVisible(!isCardSubCategoryModalVisible);
  };

  const toggleNotifyViaModal = () => {
    setNotifyViaModalVisible(!isNotifyViaModalVisible);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category.name);
    setSelectedCategory(category.name);
    toggleCardCategoryModal();
    setUserData({ ...userData, selectedCategory: category.name });
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategory(subCategory.name);
    toggleCardSubCategoryModal();
    // You might want to set some state or perform other actions related to the selected sub-category.
  };





  const handleNotifyMethodSelection = (method) => {
    setSelectedNotifyMethod(method);
    toggleNotifyViaModal();
  };

  const submitHandler = async (userData) => {
    console.log(userData)
    try {
      const response = await rateAlert(userData);
      if (response.status === 'success') {
        console.log(response.data)
        navigation.navigate("AlertList", userData);
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledContainer>
        <StatusBar style="light" backgroundColor={backgroundColor} />
        <MainContainer>
          <ScreenTitlesHeader>
            <ScreenTitles>Set Rate Alert</ScreenTitles>
          </ScreenTitlesHeader>
          <ScrollView>
            <RateEntryText>
              Get notified when a gift card rate goes above your price target
            </RateEntryText>
            <ContentMarginTop />
            <Formik
              initialValues={userData}
              onSubmit={async (values) => {
                const enteredData = {
                  selectedNotifyMethod: selectedNotifyMethod,
                  asset: userData.asset,
                  selectedCategory: selectedCategory,
                  selectedSubCategory: selectedSubCategory,
                  enteredAmount: enteredAmount,
                  selectedRate: selectedRate,
                };
                // console.log("All Entered Data:", enteredData);
                submitHandler(enteredData)
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <StyledTextInputLabel>Notify me via</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleNotifyViaModal}>
                    <StyledTextInput
                      placeholder="Select"
                      placeholderTextColor={inputPlaceholder}
                      value={selectedNotifyMethod}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <StyledTextInputLabel>
                    What asset to set notification for?
                  </StyledTextInputLabel>
                  <StyledTextInput
                    // placeholder="Gift Card"
                    placeholderTextColor={white}
                    onChangeText={handleChange("asset")}
                    onBlur={handleBlur("asset")}
                    value={userData.asset}
                    editable={false}
                  />
                  <StyledTextInputLabel>Category man</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleCardCategoryModal}>
                    <StyledTextInput
                      placeholder="Select"
                      placeholderTextColor={inputPlaceholder}
                      value={selectedCategory}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <StyledTextInputLabel>Sub Category</StyledTextInputLabel>
                  <TouchableOpacity onPress={toggleCardSubCategoryModal}>
                    <StyledTextInput
                      placeholder="Select"
                      placeholderTextColor={inputPlaceholder}
                      value={selectedSubCategory}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <FooterText>
                    The current Rate for this Gift card is {selectedRate}
                  </FooterText>
                  <FooterText>
                    Notify me when this gift Card rate is above {enteredAmount || ''}.
                  </FooterText>

                  <DoubleInput>
                    <SmallLeftInput>
                      <Image
                        source={require("../../assets/images/flag.png")}
                        style={{ width: 20, height: 20 }}
                      />
                      <NairaText>NGN</NairaText>
                    </SmallLeftInput>
                    <RightSmallInput
                      placeholder="Rate"
                      keyboardType="number-pad"
                      placeholderTextColor={inputPlaceholder}
                      onChangeText={(text) => setEnteredAmount(text)}
                      value={enteredAmount}
                    />

                  </DoubleInput>
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Create Alert</ButtonText>
                  </StyledButton>
                </StyledFormArea>
              )}
            </Formik>
          </ScrollView>
        </MainContainer>
      </StyledContainer>

      {/* =Alert pop up========= */}

      {/* =========CARD CATEGORY=============== */}

      <Modal
        isVisible={isCardCategoryModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={toggleCardCategoryModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ShortModalContainer>
          <ShortModal>
            <ShortModalHeading>
              <ShortModalTitle>Select a Category</ShortModalTitle>
              <CloseButton onPress={toggleCardCategoryModal}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </ShortModalHeading>
            <FlatList
              data={cardCartegory}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCategorySelection(item)}
                >
                  <ShortModalItemContainer>
                    {item.image && (
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          width: 25,
                          height: 25,
                          marginRight: 10,
                          borderRadius: 50,
                        }}
                      />
                    )}
                    <ShortModalItemName>{item.name}</ShortModalItemName>
                  </ShortModalItemContainer>
                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>

      {/* =================GIFT CARD SUB CATEGORY============ */}
      <Modal
        isVisible={isCardSubCategoryModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={toggleCardSubCategoryModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ShortModalContainer>
          <ShortModal>
            <ShortModalHeading>
              <ShortModalTitle>Select a Sub-Category</ShortModalTitle>
              <CloseButton onPress={toggleCardSubCategoryModal}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </ShortModalHeading>
            <FlatList
              data={cardSubCartegory}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSubCategorySelection(item)}
                >
                  <RateItemsContent>
                    <RateItemContainer>
                      {item.image && (
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 25,
                            height: 25,
                            marginRight: 10,
                            borderRadius: 50,
                          }}
                        />
                      )}
                      <ShortModalItemName>{item.name}</ShortModalItemName>
                    </RateItemContainer>
                    <RateContainer>
                      <ShortModalItemName>{item.minimumAmount}</ShortModalItemName>
                    </RateContainer>
                  </RateItemsContent>

                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>


      {/* =================ALERT NOTIFICATION SETTING============ */}
      <Modal
        isVisible={isNotifyViaModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={toggleNotifyViaModal}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <ShortModalContainer>
          <ShortModal>
            <ShortModalHeading>
              <ShortModalTitle>Select a Notification Method</ShortModalTitle>
              <CloseButton onPress={toggleNotifyViaModal}>
                <Octicons name="x" size={24} color="white" />
              </CloseButton>
            </ShortModalHeading>
            <FlatList
              data={["Email", "SMS", "Push Notification"]} // Add your notification methods here
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleNotifyMethodSelection(item)}
                >
                  <ShortModalItemContainer>
                    <ShortModalItemName>{item}</ShortModalItemName>
                  </ShortModalItemContainer>
                </TouchableOpacity>
              )}
            />
          </ShortModal>
        </ShortModalContainer>
      </Modal>
    </SafeAreaView>
  );
};

export default RateAlertForm;
