import {registerRootComponent} from "expo";
import {useEffect, useState} from "react";
import {getAuth} from "@react-native-firebase/auth";
import {useColorScheme, View, StyleSheet} from "react-native";
import BFSpinner from "@/components/BFSpinner";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GetStartedPage from "@/screens/GetStarted";
import LoginPage from "@/screens/Login";
import RegisterPage from "@/screens/Register";
import MainTabs from "@/screens/MainTabs";
import {KeyboardProvider} from "react-native-keyboard-controller";
import FirestoreScreen from "@/screens/firebase/Firestore";
import AnalyticsScreen from "@/screens/firebase/Analytics";
import CloudStorageScreen from "@/screens/firebase/CloudStorage";
import CloudFunctionsScreen from "@/screens/firebase/CloudFunctions";
import RealtimeDatabaseScreen from "@/screens/firebase/RealtimeDatabase";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {BFDarkTheme, BFDefaultTheme} from "@/utils/theme";

const Stack = createNativeStackNavigator();

const App = () => {
    const [user, setUser] = useState<any>(undefined);
    const colorScheme = useColorScheme();
    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            setUser(user || null);
        });
        return () => {
            unsubscribe();
            setUser(undefined);
        }
    }, []);

    if (user === undefined) {
        return <View style={styles.loadingContainer}>
            <BFSpinner/>
        </View>
    }

    return <>
        {!user ?
            <NavigationContainer theme={colorScheme === 'dark' ? BFDarkTheme : BFDefaultTheme}>
                <Stack.Navigator screenOptions={{
                    headerBackTitleVisible: false,
                }}>
                    <Stack.Screen name={'Get Started'} component={GetStartedPage} options={{
                        headerShown: false
                    }}/>
                    <Stack.Screen name={'Login'} component={LoginPage}/>
                    <Stack.Screen name={'Register'} component={RegisterPage}/>
                </Stack.Navigator>
            </NavigationContainer> : <NavigationContainer theme={colorScheme === 'dark' ? BFDarkTheme : BFDefaultTheme}>
                <Stack.Navigator screenOptions={{
                    headerBackTitleVisible: false,
                }}>
                    <Stack.Screen name={'BlazeFast Starter'} component={MainTabs}/>
                    <Stack.Screen name={'Firestore'} component={FirestoreScreen}/>
                    <Stack.Screen name={'Realtime Database'} component={RealtimeDatabaseScreen}/>
                    <Stack.Screen name={'Analytics'} component={AnalyticsScreen}/>
                    <Stack.Screen name={'Storage'} component={CloudStorageScreen}/>
                    <Stack.Screen name={'Cloud Functions'} component={CloudFunctionsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>}
    </>
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

GoogleSignin.configure();
registerRootComponent(App);
