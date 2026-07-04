import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Tabs} from "expo-router";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name="index" options={{
                title: "Dashboard",
                tabBarIcon: ({color, size}) => <FontAwesome name="home" color={color} size={size}/>,
            }}/>
            <Tabs.Screen name="firebase" options={{
                title: "Firebase",
                tabBarIcon: ({color, size}) => <FontAwesome name="database" color={color} size={size}/>,
            }}/>
            <Tabs.Screen name="account" options={{
                title: "Account",
                tabBarIcon: ({color, size}) => <FontAwesome name="user" color={color} size={size}/>,
            }}/>
        </Tabs>
    );
};

export default TabsLayout;
