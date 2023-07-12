import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ManajemenLahanScreen from '@/screens/ManajemenLahanScreen'
import { BerandaScreen } from '@/screens'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigation() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="BerandaScreen" component={BerandaScreen} />
			<Tab.Screen name="ManajemenLahanScreen" component={ManajemenLahanScreen} />
		</Tab.Navigator>
	)
}
