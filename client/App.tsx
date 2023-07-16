import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootLayoutScreen } from '@/layout'
import { AuthProvider } from '@/context/AuthProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalProvider } from '@gorhom/portal'
import { WeatherProvider } from '@/context/WeatherProvider'
import { useContext } from 'react'
import { useAuthContext } from '@/hooks/AuthHooks'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
   <AuthProvider>
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<PortalProvider>
					<WeatherProvider>						
							<RootLayoutScreen/>
					</WeatherProvider>
				</PortalProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
      </AuthProvider>		
	)
}
