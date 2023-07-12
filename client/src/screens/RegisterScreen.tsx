import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'LoginScreen', 'RootLayoutScreen'>
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#fff',
		justifyContent: 'center',
		paddingHorizontal: 40,
		gap: 12,
	},
	inputContainer: {
		display: 'flex',
		gap: 6,
	},
	inputField: {
		paddingHorizontal: 12,
		paddingVertical: 9,
		backgroundColor: '#FAFAFA',
	},
	additionalContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
})

export default function LoginScreen({ navigation }: Props) {
	const handleLoginButton = () => {
		navigation.navigate('RootLayoutScreen')
	}
	const handleSwitchButton = () => {
		navigation.navigate('LoginScreen')
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text>Username</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Nama Lengkap</Text>
				<TextInput placeholder="Masukkan nama lengkap" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Konfirmasi Password</Text>
				<TextInput placeholder="Masukkan konfirmasi password" style={styles.inputField} />
			</View>
			<Button title="Register" onPress={handleLoginButton} />
			<Text style={styles.additionalContainer}>
				Sudah punya akun? <Button title="masuk disini" onPress={handleSwitchButton} />
			</Text>
		</View>
	)
}
