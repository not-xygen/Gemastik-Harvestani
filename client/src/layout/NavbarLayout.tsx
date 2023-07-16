import { LahanProvider } from "@/context/LahanProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	BerandaScreen,
	ManajemenLahanScreen,
	ManajemenKeuanganScreen,
	ProfilScreen,
} from '@/screens'

const Tab = createBottomTabNavigator()
export default function NavbarLayout () {
    return (
        <LahanProvider>
            <Tab.Navigator screenOptions={{ headerShown: false , tabBarActiveBackgroundColor: "#41644A" , tabBarStyle: {
                "paddingLeft" : 30,
                "paddingRight" : 20,
                "paddingTop" : 10,
                "paddingBottom" : 10,
            }}} initialRouteName="Beranda">
                    <Tab.Screen name="Beranda" component={BerandaScreen} />
                    <Tab.Screen name="Lahan" component={ManajemenLahanScreen} />
                    <Tab.Screen name="Keuangan" component={ManajemenKeuanganScreen} />
                    <Tab.Screen name="Profil" component={ProfilScreen} />
            </Tab.Navigator>
        </LahanProvider>
    )
}