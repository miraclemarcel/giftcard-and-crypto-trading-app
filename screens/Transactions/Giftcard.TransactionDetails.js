import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import moment from "moment";
// ======icon==============
import { Octicons } from '@expo/vector-icons';

//////components--------
import {
    StyledContainer,
    Colors,
    MainContainer,
    ScreenTitles,
    ContentMarginTop,
    ReceiptContaner,
    ReceiptHeader,
    ReceiptTop,
    ReceiptInfo,
    ReceiptHeaderTitle,
    ItemInfo,
    DateAndTime,
    DateAndTimeText,
    ReceiptMainDetails,
    MainDetailsTop,
    ProductInfo,
    TransactionDescription,
    DetailedReceipt,
    LeftText,
    RightText,
    ProductName,
    ProductCategory,

} from '../../styles/styles';
import { SafeAreaView } from "react-native-safe-area-context";

const { backgroundColor, inputPlaceholder, cardsBg, white} = Colors;

const GiftcardTransactionDetails = ({ route  }) => {

    const { transaction } = route.params;
    const formattedDate = moment(transaction.createdAt).format("MMMM D, YYYY");
    const formattedTime = moment(transaction.createdAt).format("h:mm A");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <StatusBar style="light" backgroundColor={backgroundColor} />
                <MainContainer>
                    <ScreenTitles>Transaction Details</ScreenTitles>
                    <ContentMarginTop />
                    <ReceiptContaner>
                        <Image source={require("../../assets/images/icon-logo.png")} />
                     <ReceiptTop>
                        <ReceiptHeader>
                            <ReceiptHeaderTitle>Transaction receipt</ReceiptHeaderTitle>
                        </ReceiptHeader>
                        <ReceiptInfo>
                            <ItemInfo>{transaction.cardType}</ItemInfo>
                            <DateAndTime>
                                <DateAndTimeText >{formattedDate}</DateAndTimeText>
                                <DateAndTimeText>{formattedTime}</DateAndTimeText>
                            </DateAndTime>
                        </ReceiptInfo>
                     </ReceiptTop>
                     <ReceiptMainDetails>
                        <MainDetailsTop>
                        <Image source={require("../../assets/images/icon-logo.png")} />
                            <ProductInfo>
                                <ProductName>{transaction.subCatigory}</ProductName>
                                <ProductCategory>{transaction.cardType}</ProductCategory>
                            </ProductInfo>
                        </MainDetailsTop>
                        <TransactionDescription>
                            <DetailedReceipt>
                                <LeftText>Amount Received</LeftText>
                                <RightText>N{transaction.salesAmount}</RightText>
                            </DetailedReceipt>
                            <DetailedReceipt>
                                <LeftText>Amount on card</LeftText>
                                <RightText>${transaction.cardAmount}</RightText>
                            </DetailedReceipt>
                            <DetailedReceipt>
                                <LeftText>Rate</LeftText>
                                <RightText>N{transaction.selectedRate}/$</RightText>
                            </DetailedReceipt>
                            <DetailedReceipt>
                                <LeftText>Card form</LeftText>
                                <RightText>{transaction.cardForm}</RightText>
                            </DetailedReceipt>
                      
                            <DetailedReceipt>
                                <LeftText>Status</LeftText>
                                <RightText>{transaction.status}</RightText>
                            </DetailedReceipt>
                        </TransactionDescription>
                     </ReceiptMainDetails>
                    </ReceiptContaner>
                </MainContainer>
            </StyledContainer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  


});

export default GiftcardTransactionDetails;
