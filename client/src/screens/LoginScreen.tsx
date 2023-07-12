import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { useAuthContext } from '@/hooks/AuthHooks'
import { useState } from 'react'
import { UserData } from '@/context/AuthContext'

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


export default function LoginScreen({ navigation }: Props) {
	const {login,accessToken} = useAuthContext()
 	const [user,setUser] = useState<UserData>({email : '' , password : ''})
	const handleLoginButton = async () => {
		await login(user)
		if(!accessToken){
			console.log("Error")
		} else {
			navigation.navigate('RootLayoutScreen')
		}

	}

	const handleSwitchButton = () => {
		navigation.navigate('RegisterScreen')
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
				<Text>Username</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} onChangeText={handleChangeEmail} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput placeholder="Masukkan Username" style={styles.inputField} onChangeText={handleChangePassword} />
			</View>
			<Button title="Login" onPress={handleLoginButton}/>
			<Text style={styles.additionalContainer}>
				Belum punya akun? <Button title="daftar disini" onPress={handleSwitchButton} />
			</Text>
		</View>
	)
}
