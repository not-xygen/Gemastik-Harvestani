import { LahanProvider } from '@/context/LahanProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	BerandaScreen,
	ManajemenLahanScreen,
	ManajemenKeuanganScreen,
	ProfilScreen,
	LahanDetail,
} from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const LahanStack = createNativeStackNavigator()
const BerandaStack = createNativeStackNavigator()

type IconName = 'home' | 'home-outline' | 'tree' | 'tree-outline' | 'account' | 'account-outline' | 'account-cash' | 'account-cash-outline';
export default function NavbarLayout() {
	return (
		<LahanProvider>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
                        let iconName: IconName = 'home-outline';
						if (route.name === 'Beranda') {
							iconName = focused ? 'home' : 'home-outline'
						} else if (route.name === 'Lahan') {
							iconName = focused ? 'tree' : 'tree-outline'
						} else if (route.name === 'profile') {
							iconName = focused ? 'account' : 'account-outline'
						} else if (route.name === 'Keuangan') {
							iconName = focused ? 'account-cash' : 'account-cash-outline'
						}
						return <MaterialCommunityIcons name={iconName} size={32} color={color} />
					},
                    headerShown: false,tabBarActiveBackgroundColor: "#41644A", tabBarStyle : {
                        "paddingLeft" : 30,
                        "paddingRight" : 20,
                        "paddingTop" : 10,
                        "paddingBottom" : 10,
                    }
				})}
				initialRouteName="Beranda"
			>
				<Tab.Screen name="Beranda">
					{() => (
						<BerandaStack.Navigator screenOptions={{ headerShown: false }}>
							<BerandaStack.Screen name="Beranda" component={BerandaScreen} />
							<BerandaStack.Screen name="LahanDetail">{() => <LahanDetail />}</BerandaStack.Screen>
						</BerandaStack.Navigator>
					)}
				</Tab.Screen>
				<Tab.Screen name="Lahan">
					{() => (
						<LahanStack.Navigator screenOptions={{ headerShown: false }}>
							<LahanStack.Screen name="ManajemenLahanScreen" component={ManajemenLahanScreen} />
							<LahanStack.Screen name="LahanDetail">{() => <LahanDetail />}</LahanStack.Screen>
						</LahanStack.Navigator>
					)}
				</Tab.Screen>
				<Tab.Screen name="Keuangan" component={ManajemenKeuanganScreen} />
				<Tab.Screen name="profile" component={ProfilScreen} />
			</Tab.Navigator>
		</LahanProvider>
	)
}
