import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	BerandaScreen,
	ManajemenLahanScreen,
	ManajemenKeuanganScreen,
	ProfilScreen,
} from '@/screens'

const Tab = createBottomTabNavigator()

export default function RootLayoutScreen() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Beranda" component={BerandaScreen} />
			<Tab.Screen name="Lahan" component={ManajemenLahanScreen} />
			<Tab.Screen name="Keuangan" component={ManajemenKeuanganScreen} />
			<Tab.Screen name="Profil" component={ProfilScreen} />
		</Tab.Navigator>
	)
}
