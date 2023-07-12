import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { useState } from 'react'
import { UserData } from '@/context/AuthContext'
import { useAuthContext } from '@/hooks/AuthHooks'

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

export default function RegisterScreen({ navigation }: Props) {
	const [user ,setUser] = useState<UserData>({email : "", password : ""})
	const {register,accessToken} = useAuthContext()
	const handleRegister =async () => {
		await register(user)
		if(!accessToken){
			console.log("Password atau Email Salah")
		} else {
			navigation.navigate('RootLayoutScreen')
		}
	}
	const handleSwitchButton = () => {
		navigation.navigate('LoginScreen')
	}

	const handleChangeEmail = (value : String) => {
		setUser((prevData) => ({
			...prevData,
			email :value
		}))
	}
	const handleChangePassword = (value : String) => {
		setUser((prevData) => ({
			...prevData,
			password :value
		}))
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text>Email</Text>
				<TextInput placeholder="Masukkan Email" style={styles.inputField} onChangeText={handleChangeEmail}/>
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput placeholder="Masukkan Password" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Konfirmasi Password</Text>
				<TextInput placeholder="Masukkan Password" style={styles.inputField}  onChangeText={handleChangePassword}/>
			</View>
			<Button title="Register" onPress={handleRegister} />
			<Text style={styles.additionalContainer}>
				Sudah punya akun? <Button title="masuk disini" onPress={handleSwitchButton} />
			</Text>
		</View>
	)
}
