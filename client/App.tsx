import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, SplashScreen, RegisterScreen, LahanDetailScreen } from '@/screens'
import { RootLayoutScreen } from '@/layout'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalProvider } from '@gorhom/portal'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<PortalProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName="SplashScreen">
							<Stack.Screen
								name="SplashScreen"
								component={SplashScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="LoginScreen"
								component={LoginScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="RegisterScreen"
								component={RegisterScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="RootLayoutScreen"
								component={RootLayoutScreen}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="LahanDetailScreen"
								component={LahanDetailScreen}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</PortalProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}
