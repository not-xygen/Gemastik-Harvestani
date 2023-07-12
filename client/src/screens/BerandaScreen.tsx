import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native'

import { StatusBar } from 'expo-status-bar'

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
	},
	weatherContainer: { width: '100%', height: 'auto', paddingHorizontal: 20, paddingVertical: 12 },
	weatherTitle: { fontSize: 18, color: '#41644A' },
	weatherTemperatureContainer: {},
	weatherTemperatureDetailContainer: {},
	lahanContainer: { width: '100%', height: 'auto', paddingHorizontal: 20, paddingVertical: 12 },
})

export default function BerandaScreen() {
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
				<Text>Cuaca Hari Ini</Text>
				<View
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						gap: 8,
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
							<Text>21°C</Text>
							<View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								<Text>H: 23°C</Text>
								<Text>L: 23°C</Text>
							</View>
						</View>
						<Text>Cuaca</Text>
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
						<View>
							<Text>Kelembapan</Text>
							<Text>30%</Text>
						</View>
						<View>
							<Text>Curah Hujan</Text>
							<Text>3.1ml</Text>
						</View>
						<View>
							<Text>Kualitas Udara</Text>
							<Text>80</Text>
						</View>
					</View>
				</View>
			</View>
			<ScrollView style={styles.lahanContainer}>
				<Text style={{ color: '#202020', fontWeight: '700', fontSize: 14 }}>Aksi Cepat</Text>
				<View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							width: '100%',
							backgroundColor: '#222222',
							borderRadius: 8,
							gap: 8,
						}}
					>
						<Image
							source={require('../../assets/placeholder_background.jpg')}
							style={{ width: '20%', height: 60, borderRadius: 8 }}
						/>
						<View
							style={{
								display: 'flex',
								flexGrow: 1,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								backgroundColor: '#222222',
							}}
						>
							<View
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',

									backgroundColor: '#222222',
								}}
							>
								<Text>Lahan 1</Text>
								<Text>Jagung</Text>
							</View>
							<Text>Button</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
