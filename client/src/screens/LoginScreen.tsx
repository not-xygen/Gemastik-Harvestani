import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'
import { useAuthContext } from '@/hooks/AuthHooks'
import { useState } from 'react'
import { UserData } from '@/context/AuthContext'
import { combineTransition } from 'react-native-reanimated'

type NavigationProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterScreen', 'NavbarLayout'>
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
		shadowColor : '#202020',
		shadowOffset : {
			width : 0,
			height : 1 
		},
		shadowOpacity : 0.4,
		shadowRadius : 2,
		borderRadius : 4
	},
	inputField: {
		paddingHorizontal: 12,
		paddingVertical: 9,
		backgroundColor: '#FAFAFA',
		borderRadius : 4
	},
	additionalContainer: {
		display: 'flex',
		justifyContent : "center",
		flexDirection: 'row',
	},
	buttonContainer : {
		backgroundColor : "#41644A",
		borderRadius : 4,
		display : "flex",
		justifyContent: "center",
		flexDirection : 'row',
		shadowColor : '#202020',
		shadowOffset : {
			width : 0,
			height : 2 
		},
		shadowOpacity : 1,
		shadowRadius : 3
	},
	daftarText : {
		color: "#E86A33",
		fontWeight: "600",
	},
	loginText:{
		color: "#FFFF",
		fontWeight: "bold",
		fontSize : 20,
		padding : 10
	}
})

export default function LoginScreen({ navigation }: NavigationProps) {
	const { login, accessToken } = useAuthContext()
	const [loading,setloading] = useState<Boolean>(false)
	const [user, setUser] = useState<UserData>({ email: '', password: '' })
	const handleLoginButton = async () => {
		setloading(true)
		await login(user)
		setloading(false)
	}


	
	const handleSwitchButton = () => {
		navigation.navigate('RegisterScreen')
	}

	const handleChangeEmail = (value: String) => {
		setUser((prevData) => ({
			...prevData,
			email: value,
		}))
	}
	const handleChangePassword = (value: String) => {
		setUser((prevData) => ({
			...prevData,
			password: value,
		}))
	}
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Text>Username</Text>
				<TextInput
					placeholder="Masukkan Username"
					style={styles.inputField}
					onChangeText={handleChangeEmail}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text>Password</Text>
				<TextInput
					secureTextEntry={true}
					placeholder="Masukkan Username"
					style={styles.inputField}
					onChangeText={handleChangePassword}
				/>
			</View>
			{loading?(
				<ActivityIndicator size="large" color="blue" />
			) : (
				<View style={styles.buttonContainer}>
					<Text style={styles.loginText} onPress={handleLoginButton}>Login</Text>
				</View>
			)}
			<View style={styles.additionalContainer}>
				<Text>
				Belum punya akun? 
				</Text>
				<Text style={styles.daftarText} onPress={handleSwitchButton}>Daftar Disini</Text>
			</View>
		</View>
	)
}
