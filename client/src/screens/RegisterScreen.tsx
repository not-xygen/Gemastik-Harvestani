import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native'
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

export default function RegisterScreen({ navigation }: Props) {
	const [user ,setUser] = useState<UserData>({email : "", password : ""})
	const [loading,setLoading] = useState<Boolean>(false)
	const {register,accessToken} = useAuthContext()
	const handleRegister =async () => {
		setLoading(true)
		await register(user)
		setLoading(false)
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
				<TextInput secureTextEntry={true} placeholder="Masukkan Password" style={styles.inputField} />
			</View>
			<View style={styles.inputContainer}>
				<Text>Konfirmasi Password</Text>
				<TextInput secureTextEntry={true} placeholder="Masukkan Password" style={styles.inputField}  onChangeText={handleChangePassword}/>
			</View>
				{loading ? (
					<ActivityIndicator size="large" color="blue" />
					): (
					<View style={styles.buttonContainer}>
						<Text style={styles.loginText} onPress={handleRegister}>Register</Text>
					</View>
				)}
			<View style={styles.additionalContainer}>
				<Text>Sudah punya akun? </Text>
				<Text style={styles.daftarText} onPress={handleSwitchButton}>Masuk Disini</Text>
			</View>
		</View>
	)
}
