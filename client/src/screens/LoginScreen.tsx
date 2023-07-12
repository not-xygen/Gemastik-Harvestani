import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types'

type Props = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterScreen', 'BerandaScreen'>
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default function LoginScreen({ navigation }: Props) {
	return (
		<View style={styles.container}>
			<Text></Text>
			<Text>HarvesTani</Text>
			<StatusBar style="auto" />
		</View>
	)
}
