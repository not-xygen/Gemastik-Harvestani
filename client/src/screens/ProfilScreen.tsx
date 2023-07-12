import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default function ProfilScreen() {
	return (
		<View style={styles.container}>
			<Text>Profil</Text>
		</View>
	)
}
