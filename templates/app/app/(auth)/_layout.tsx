import {Stack} from "expo-router";

export const unstable_settings = {
    initialRouteName: "get-started",
};

const AuthLayout = () => {
    return (
        <Stack screenOptions={{headerBackButtonDisplayMode: "minimal"}}>
            <Stack.Screen name="get-started" options={{headerShown: false}}/>
            <Stack.Screen name="login" options={{title: "Login"}}/>
            <Stack.Screen name="register" options={{title: "Register"}}/>
        </Stack>
    );
};

export default AuthLayout;
