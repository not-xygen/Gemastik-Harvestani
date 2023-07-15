import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import { TambahLahanSheet,LahanCard } from '@/components'
import { LahanProvider } from '@/context/LahanProvider'
import { useLahanContext } from '@/hooks/LahanHooks'
import { useEffect } from 'react'
import { LahanData } from '../context/LahanContext';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		paddingTop: 60,
		position: 'relative',
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

export default function ManajemenLahanScreen() {
	const {show,allLahan} = useLahanContext()
	useEffect(() => {
		show()
	},[])
	return (
		<>
			<View style={styles.container}>
				<View
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						zIndex: 2,
					}}
				>
						<TambahLahanSheet />
				</View>

				<View style={{ paddingHorizontal: 20 }}>
					<TextInput placeholder="Cari Lahan" style={styles.inputField} />
				</View>
				<View style={styles.lahanContainer}>
					<Text
						style={{ color: '#202020', fontWeight: '700', fontSize: 16, paddingHorizontal: 20 }}
					>
						Lahan-mu
					</Text>
					<ScrollView style={{ height: '100%', paddingHorizontal: 20, paddingVertical: 12 }}>
						{!allLahan ? <>
						</> : <>
						{allLahan.lahan.map((data : any) => {
								return <LahanCard nama={data.nama} />
							})}</>}
					</ScrollView>
				</View>
			</View>
		</>
	)
}
