import {useEffect, useState} from "react";
import {useColorScheme} from "react-native";
import {SplashScreen, Stack} from "expo-router";
import {ThemeProvider} from "expo-router/react-navigation";
import {KeyboardProvider} from "react-native-keyboard-controller";
import {FirebaseAuthTypes, getAuth} from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {BFDarkTheme, BFDefaultTheme} from "@/utils/theme";

GoogleSignin.configure();
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null | undefined>(undefined);
    const colorScheme = useColorScheme();

    useEffect(() => {
        return getAuth().onAuthStateChanged((nextUser) => {
            setUser(nextUser ?? null);
        });
    }, []);

    useEffect(() => {
        if (user !== undefined) {
            SplashScreen.hideAsync();
        }
    }, [user]);

    // Keep the splash screen up until we know whether the user is signed in.
    if (user === undefined) {
        return null;
    }

    return (
        <KeyboardProvider>
            <ThemeProvider value={colorScheme === 'dark' ? BFDarkTheme : BFDefaultTheme}>
                <Stack screenOptions={{headerShown: false}}>
                    {/* Signed-out stack */}
                    <Stack.Protected guard={!user}>
                        <Stack.Screen name="(auth)"/>
                    </Stack.Protected>
                    {/* Signed-in stack */}
                    <Stack.Protected guard={!!user}>
                        <Stack.Screen name="(app)"/>
                    </Stack.Protected>
                </Stack>
            </ThemeProvider>
        </KeyboardProvider>
    );
};

export default RootLayout;
