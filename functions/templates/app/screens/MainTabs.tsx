import FontAwesome from '@expo/vector-icons/FontAwesome';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import DashboardTab from "@/screens/tabs/DashboardTab";
import FirebaseTab from "@/screens/tabs/FirebaseTab";
import AccountTab from "@/screens/tabs/AccountTab";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Dashboard" component={DashboardTab} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name={'home'} color={color} size={size}/>
        }}/>
        <Tab.Screen name="Firebase" component={FirebaseTab} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name={'database'} color={color} size={size}/>
        }}/>
        <Tab.Screen name="Account" component={AccountTab} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name={'user'} color={color} size={size}/>
        }}/>
    </Tab.Navigator>
};

export default MainTabs;
