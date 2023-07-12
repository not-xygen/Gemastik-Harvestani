import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BerandaScreen, SplashScreen } from '@/screens'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SplashScreen">
				<Stack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="BerandaScreen"
					component={BerandaScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
