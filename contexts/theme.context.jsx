import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = {
    dark: {
        white: "#ffffff",
        black: "#080D18",
        danger: "#FF0000",
        primary: "#1350E8", 
        success: "#3CDF21",
        cardsBg: "#17203D",
        cardsBorder: "#2E3852",
        primaryHover: "#144FE1",
        homeHeaderBg: "#102249",
        backgroundColor: "#020817",
        inputBorderFocus: "#1350E8",
        inputPlaceholder: "#8B9CC8",
        inputBg: "rgba(19, 80, 232, 0.3)",
        buttonTextColor: "#ffffff",
        ContainerColor: "rgba(19, 80, 232, 0.3)",
        inputPlaceHolderTextAlt: "#8B9CC8",
        inputTextColor: "#020817",
        StatusBarBG: "#020817",
        BuyOrSellBtn: "rgba(19, 80, 232, 0.3)",
        // =====home wallet colors=========
        homeWalletColo: "#17203D",
        walletCurrencyText: "#ffffff",
        walletPriceText: "#ffffff",
        balanceIcons: "#8B9CC8",
        walletWithdrawBtn: "rgba(19, 80, 232, 0.3)",
        walletNGNBtn: "#2E3852",
        // ======settings colors=========
        SeetingsSections: "#17203D",
        // ======wallet screen color====
        walletTopContainer: "#17203D",
        // =========tab bar color=========
        tabBarColor: "#102249",
        tabBarActiveBG: "#1350E8",
        tabBarInactiveBG: "#8B9CC8"


    },
    light: {
        white: "#080D18",
        black: "#000000",
        danger: "#FF0000",
        success: "#3CDF21",
        primary: "#1350E8",
        cardsBg: "#17203D",
        cardsBorder: "#2E3852",
        primaryHover: "#144FE1",
        homeHeaderBg: "#102249",
        backgroundColor: "#f4f5ff",
        inputBorderFocus: "#1350E8",
        inputPlaceholder: "#8B9CC8",
        inputBg: "rgba(19, 80, 232, 0.3)",
        buttonTextColor: "#ffffff",
        ContainerColor: "#A9C4F9",
        inputPlaceHolderTextAlt: "#1350E8",
        inputTextColor: "#080D18",
        StatusBarBG: "#1350E8",
        BuyOrSellBtn: "#17203D",
        // =====home wallet colors=========
        homeWalletColo: "#DEE9FF",
        walletCurrencyText: "#ffffff",
        walletPriceText: "#020817",
        balanceIcons: "#8B9CC8",
        walletWithdrawBtn: "#1350E8",
        walletNGNBtn: "#A9C4F9",
        // ======settings colors=========
          SeetingsSections: "#DEE9FF",
        // ======wallet screen color=====
         walletTopContainer: "#17203D",
        // =========tab bar color=========
        tabBarColor: "#1350E8",
        tabBarActiveBG: "#ffffff",
        tabBarInactiveBG: "#8B9CC8"
    },
};

const ThemeContext = React.createContext();

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) return console.warn("useTheme can only be used inside ThemeProvider");

    return context;
};

export default function ({ children }) {
    const [lightMode, setLightMode] = React.useState(false);

    const theme = React.useMemo(() => themes[lightMode ? 'light' : 'dark'], [lightMode]);

    React.useEffect(() => {
        getThemeValue();
    }, []);

    React.useEffect(() => {
        updateThemeValue();
    }, [lightMode]);

    const getThemeValue = async () => {
        try {
            let theme = JSON.parse(await AsyncStorage.getItem('theme') || 'false');
            setLightMode(theme);
        } catch (error) { };
    };

    const updateThemeValue = async () => {
        try {
            await AsyncStorage.setItem('theme', JSON.stringify(lightMode));
        } catch (error) { };
    };

    return <ThemeContext.Provider value={{ theme, lightMode, setLightMode }}>
        <ThemeProvider theme={theme} children={children} />
    </ThemeContext.Provider>
}