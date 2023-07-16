import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { useLahanContext } from '@/hooks/LahanHooks'
import { useEffect, useState } from 'react'
import { LahanCard } from '@/components'
import { WeatherProvider } from '@/context/WeatherProvider'
import { useWeatherContext } from '@/hooks/WeatherHooks'

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	headerContainer: { width: '100%', height: '30%' },
	headerBackground: {
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	headerOverlay: {
		width: '100%',
		height: '100%',
		backgroundColor: '#222222',
		opacity: 0.5,
		position: 'absolute',
	},
	headerTitle: {
		marginLeft: 20,
		marginBottom: 10,
		fontSize: 24,
		fontWeight: 'bold',
		color: '#E86A33',
	},
	headerProfilePicture: {
		borderRadius: 100,
		width: 100,
		height: 100,
		display: 'flex',
		marginRight: 20,
		top: 20,
		zIndex: 2,
	},
	weatherContainer: {
		backgroundColor: '#FAFAFA',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		width: '100%',
		height: 'auto',
		paddingHorizontal: 20,
		paddingVertical: 24,
		borderRadius: 8,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 24,
		zIndex: -1,
	},
	weatherTitle: { fontSize: 18, color: '#41644A' },
	weatherTemperatureContainer: {},
	weatherTemperatureDetailContainer: {},
	lahanContainer: {
		width: '100%',
		height: 'auto',
		paddingVertical: 24,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
})

export default function BerandaScreen() {
	const {show,allLahan} = useLahanContext()
	const {get} = useWeatherContext()
	const [weatherData, setWeatherData]= useState<any>()
	useEffect(() => {
		show()
		get().then(data => {
			setWeatherData(data)
		})
	},[])

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<ImageBackground
					source={require('../../assets/placeholder_background.jpg')}
					style={styles.headerBackground}
				>
					<View style={styles.headerOverlay} />
					<Text style={styles.headerTitle}>Hi, JohnDoe47</Text>
					<Image
						source={require('../../assets/placeholder_profile_picture.png')}
						style={styles.headerProfilePicture}
					/>
				</ImageBackground>
			</View>
			<View style={styles.weatherContainer}>
				<Text style={{ fontWeight: '700', fontSize: 18, color: '#202020' }}>Cuaca Hari Ini d {weatherData ? weatherData?.location.region : ""}</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: 'auto',
						gap: 12,
					}}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								gap: 8,
								alignItems: 'center',
							}}
						>
							<Text style={{ fontWeight: '700', fontSize: 24 }}>{weatherData ? weatherData?.current.temp_c : ""}°C</Text>
							<View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<Text style={{ fontWeight: '300', fontSize: 12 }}>H: {weatherData?.current.humidity} RH</Text>
								<Text style={{ fontWeight: '300', fontSize: 12 }}>L: 23°C</Text>
							</View>
						</View>
						<Image
							source={{ uri: 'https://img.icons8.com/ios/50/cloud--v1.png' }}
							style={{ height: 40, width: 40 }}
						/>
					</View>
					<View style={{ height: 2, width: '100%', backgroundColor: '#222222' }} />
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
							<Text style={{ fontSize: 12 }}>Kelembapan</Text>
							<Text style={{ fontSize: 12, fontWeight: '700' }}>{weatherData?.current.humidity ? weatherData?.current.humidity : ""}%</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
							<Text style={{ fontSize: 12 }}>Curah Hujan</Text>
							<Text style={{ fontSize: 12, fontWeight: '700' }}>3.1ml</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
							<Text style={{ fontSize: 12 }}>Kualitas Udara</Text>
							<Text style={{ fontSize: 12, fontWeight: '700' }}>80</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.lahanContainer}>
				<Text style={{ color: '#202020', fontWeight: '700', fontSize: 16, paddingHorizontal: 20 }}>
					Lahan-mu
				</Text>
				<ScrollView style={{ height: '100%', paddingHorizontal: 20, paddingVertical: 12 }}>
					{!allLahan ? <>
						</> : <>
						{allLahan.lahan.map((data : any) => {
								return <LahanCard nama={data.nama} />
							})}</>}
					
				</ScrollView>
			</View>
		</View>
	)
}
