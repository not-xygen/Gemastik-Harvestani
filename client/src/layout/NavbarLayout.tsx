import { LahanProvider } from "@/context/LahanProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	BerandaScreen,
	ManajemenLahanScreen,
	ManajemenKeuanganScreen,
	ProfilScreen,
    LahanDetailScreen,
    LahanDetail,
} from '@/screens'
import { Settings } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LahanCard } from "@/components";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";

const Tab = createBottomTabNavigator()
const LahanStack = createNativeStackNavigator()
const BerandaStack = createNativeStackNavigator()
export default function NavbarLayout () {
    return (
        <LahanProvider>
            <Tab.Navigator screenOptions={{ headerShown: false , tabBarActiveBackgroundColor: "#41644A" , tabBarStyle: {
                "paddingLeft" : 30,
                "paddingRight" : 20,
                "paddingTop" : 10,
                "paddingBottom" : 10,
            }}} initialRouteName="Beranda">
                    <Tab.Screen name="Beranda" >
                        {() => (
                            <BerandaStack.Navigator screenOptions={{headerShown : false}}>
                                <BerandaStack.Screen name="Beranda" component={BerandaScreen}/>
                                <BerandaStack.Screen name="LahanDetail">
                                    {()=>(
                                        <LahanDetail/>
                                    )}
                                </BerandaStack.Screen>
                            </BerandaStack.Navigator>
                        )}
                    </Tab.Screen>
                    <Tab.Screen name="Lahan" >
                        {() => (
                            <LahanStack.Navigator screenOptions={{headerShown : false}}>
                                <LahanStack.Screen name="ManajemenLahanScreen" component={ManajemenLahanScreen} />
                                <LahanStack.Screen name="LahanDetail">
                                    {()=>(
                                        <LahanDetail/>
                                    )}
                                </LahanStack.Screen>
                            </LahanStack.Navigator>
                        )}
                    </Tab.Screen>
                    <Tab.Screen name="Keuangan" component={ManajemenKeuanganScreen} />
                    <Tab.Screen name="Profil" component={ProfilScreen} />
            </Tab.Navigator>
        </LahanProvider>
    )
}