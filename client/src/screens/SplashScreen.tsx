import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'


const SplashScreen: React.FC<any> = ({children}) => {
	const [timePassed, setTimePassed] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTimePassed(true)
		}, 5000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	if (!timePassed) {
		return (
			<View style={styles.splash}>
				<Image source={require('../../assets/splash.png')} style={styles.logo} />
			</View>
		)
	} else {
		return (
			<>{children}</>
		)
	}

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
