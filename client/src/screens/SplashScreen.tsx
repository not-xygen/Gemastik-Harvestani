import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'

interface NavigationProps {
	navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>
}

const SplashScreen = ({ navigation }: NavigationProps) => {
	const [timePassed, setTimePassed] = useState(false)

	setTimeout(function () {
		setTimePassed(true)
	}, 5000)

	if (!timePassed) {
		return (
			<View style={styles.splash}>
				<Image source={require('../../assets/splash.png')} style={styles.logo} />
			</View>
		)
	}
	navigation.navigate('LoginScreen')
	return null
}

const styles = StyleSheet.create({
	splash: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	logo: {
		width: '80%',
	},
})

export default SplashScreen
