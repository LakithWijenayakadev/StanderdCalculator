import React, { useState, useEffect, useRef } from 'react';
import MyKeyboard from './src/components/MyKeyboard';
import { SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator, Animated, View } from 'react-native';
import { ThemeContext } from './src/context/ThemeContext';
import { Styles } from './src/components/styles/GlobalStyles';
import { myColors } from './src/components/styles/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import SplashScreen from 'react-native-splash-screen';
import { TouchableRipple } from 'react-native-paper';

export default function App() {
    const [theme, setTheme] = useState('light');
    const [Indicator, setIndicator] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    changeNavigationBarColor(theme == 'light' ? myColors.lightGray : myColors.black, false);

    useEffect(() => {
        SplashScreen.hide();
        setTimeout(function () {
            setIndicator(false);
        }, 300);

        AsyncStorage.getItem('AppTheme').then(value => {
            if (value == null) {
                setTheme('light');
                AsyncStorage.setItem('AppTheme', 'light');
            } else {
                AsyncStorage.setItem('AppTheme', value);

                setTheme(value);
            }
        });
    }, []);

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    function ThemeSwitch() {
        if (theme === 'light') {
            fadeOut();

            AsyncStorage.setItem('AppTheme', 'dark');
            setTimeout(function () {
                fadeIn();
                setTheme('dark');
            }, 500);
        } else {
            fadeOut();

            AsyncStorage.setItem('AppTheme', 'light');
            setTimeout(function () {
                fadeIn();
                setTheme('light');
            }, 500);
        }
    }
    if (Indicator == true) {
        return (
            <SafeAreaView
                style={
                    theme === 'light' ? (
                        [Styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]
                    ) : (
                        [
                            Styles.container,
                            { backgroundColor: myColors.black, flex: 1, justifyContent: 'center', alignItems: 'center' }
                        ]
                    )
                }
            >
                <StatusBar
                    backgroundColor={theme === 'light' ? myColors.light : myColors.black}
                    barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                />

                <ActivityIndicator size={50} color={theme === 'light' ? myColors.gray : myColors.light} />
            </SafeAreaView>
        );
    } else {
        return (
            <ThemeContext.Provider value={theme}>
                <StatusBar
                    backgroundColor={theme === 'light' ? myColors.light : myColors.black}
                    barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                />
                <SafeAreaView
                    style={theme === 'light' ? Styles.container : [Styles.container, { backgroundColor: myColors.black }]}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => ThemeSwitch()}
                        style={{
                            alignSelf: 'flex-start',
                            flex: 0.1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 20
                        }}
                    >
                        <Animated.View
                            style={[
                                {
                                    // Bind opacity to animated value
                                    opacity: fadeAnim
                                }
                            ]}
                        >
                            <Icon
                                name={theme == 'light' ? 'white-balance-sunny' : 'moon-waxing-crescent'}
                                size={30}
                                color={theme == 'light' ? myColors.dark : myColors.light}
                            />
                        </Animated.View>
                    </TouchableOpacity>

                    <View style={{ flex: 0.9 }}>
                        <MyKeyboard />
                    </View>
                </SafeAreaView>
            </ThemeContext.Provider>
        );
    }
}
