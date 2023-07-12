import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'

type NavigationProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterScreen', 'RootLayoutScreen'>
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

export default function LoginScreen({ navigation }: NavigationProps) {
	const handleLoginButton = () => {
		navigation.navigate('RootLayoutScreen')
	}

	const handleSwitchButton = () => {
		navigation.navigate('RegisterScreen')
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text>Username</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} />
			</View>
			<Button title="Login" onPress={handleLoginButton} />
			<Text style={styles.additionalContainer}>
				Belum punya akun? <Button title="daftar disini" onPress={handleSwitchButton} />
			</Text>
		</View>
	)
}
