import {Stack} from "expo-router";

export const unstable_settings = {
    initialRouteName: "(tabs)",
};

const AppLayout = () => {
    return (
        <Stack screenOptions={{headerBackButtonDisplayMode: "minimal"}}>
            <Stack.Screen name="(tabs)" options={{title: "BlazeFast Starter"}}/>
            <Stack.Screen name="firestore" options={{title: "Firestore"}}/>
            <Stack.Screen name="realtime-database" options={{title: "Realtime Database"}}/>
            <Stack.Screen name="analytics" options={{title: "Analytics"}}/>
            <Stack.Screen name="storage" options={{title: "Storage"}}/>
            <Stack.Screen name="cloud-functions" options={{title: "Cloud Functions"}}/>
        </Stack>
    );
};

export default AppLayout;
