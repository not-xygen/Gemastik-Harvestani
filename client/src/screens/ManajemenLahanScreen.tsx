import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TextInput,
	Button,
	Pressable,
} from 'react-native'
import { TambahLahanSheet, LahanCard } from '@/components'
import { useLahanContext } from '@/hooks/LahanHooks'
import { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DataLahanDetail, RootStackParamList } from '@/types'

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		paddingTop: 60,
		position: 'absolute',
		zIndex: 0,
	},
	lahanContainer: {
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: 12,
	},
	inputField: {
		paddingHorizontal: 8,
		paddingVertical: 12,
		backgroundColor: '#FAFAFA',
		borderRadius: 8,
	},
})
export type NavigationProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, 'LahanDetail', 'BerandaScreen'>
}
export default function ManajemenLahanScreen({ navigation }: NavigationProps) {
	const { show, allLahan, setDetailLahan } = useLahanContext()
	useEffect(() => {
		show()
	}, [])
	return (
		<View style={styles.container}>
			<TambahLahanSheet />
			<View style={{ paddingHorizontal: 20 }}>
				<TextInput placeholder="Cari Lahan" style={styles.inputField} />
			</View>
			<View style={styles.lahanContainer}>
				<Text style={{ color: '#202020', fontWeight: '700', fontSize: 16, paddingHorizontal: 20 }}>
					Lahan-mu
				</Text>
				<ScrollView style={{ height: '100%', paddingHorizontal: 20, paddingVertical: 12 }}>
					{!allLahan ? (
						<></>
					) : (
						<>
							{allLahan.lahan.map((data: DataLahanDetail) => {
								return (
									<Pressable
										onPress={() => {
											setDetailLahan(data)
											navigation.navigate('LahanDetail')
										}}
									>
										<LahanCard
											id={data.id}
											nama={data.nama}
											luas={data.luas}
											alamat={data.alamat}
											lat={data.lat}
											lon={data.lon}
											user_id={data.user_id}
											created_at={data.created_at}
											update_at={data.update_at}
										/>
									</Pressable>
								)
							})}
						</>
					)}
				</ScrollView>
			</View>
		</View>
	)
}
