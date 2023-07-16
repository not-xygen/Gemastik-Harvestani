import { StyleSheet, View } from 'react-native'
import { useAuthContext } from '@/hooks/AuthHooks'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, SplashScreen, RegisterScreen, LahanDetailScreen } from '@/screens'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { NavbarLayout } from '@/layout/index'

const Stack = createNativeStackNavigator()
          

export default function RootLayoutScreen() {
	const {accessToken} = useAuthContext()
	const [token,setToken] = useState<any>()
	useEffect(() => { 
		setToken(accessToken)
	},[accessToken])
	return (
		<NavigationContainer>
				<SplashScreen>
				<Stack.Navigator >
					{token === "" ? (
						<Stack.Group screenOptions={{headerShown :false}}>
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
						</Stack.Group>
					) : (
						<Stack.Screen
								name="NavbarLayout"
								component={NavbarLayout}
								options={{ headerShown: false }}
						/>
					)}
				</Stack.Navigator>
			</SplashScreen>
			</NavigationContainer>
	)
}
