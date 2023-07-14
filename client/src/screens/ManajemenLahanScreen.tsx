import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import { TambahLahanSheet } from '@/components'
import { LahanProvider } from '@/context/LahanProvider'

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
						<View
							style={{
								display: 'flex',
								backgroundColor: '#FAFAFA',
								flexDirection: 'row',
								alignItems: 'center',
								width: '100%',
								borderRadius: 8,
								gap: 8,
								shadowColor: '#E86A33',
								shadowOffset: {
									width: 0,
									height: 0,
								},
								shadowOpacity: 0.5,
								shadowRadius: 1,
								elevation: 10,
								marginBottom: 12,
							}}
						>
							<Image
								source={require('../../assets/placeholder_background.jpg')}
								style={{ width: '20%', height: 80, borderRadius: 8 }}
							/>
							<View
								style={{
									display: 'flex',
									flexGrow: 1,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
										gap: 4,
									}}
								>
									<Text style={{ fontSize: 16, fontWeight: '700' }}>Lahan 1</Text>
									<View
										style={{
											backgroundColor: '#E86A33',
											paddingHorizontal: 8,
											paddingVertical: 4,
											borderRadius: 8,
										}}
									>
										<Text
											style={{
												fontSize: 12,
												color: '#FAFAFA',
												fontWeight: '400',
											}}
										>
											Jagung
										</Text>
									</View>
								</View>
								<Image
									source={{ uri: 'https://img.icons8.com/ios/50/forward--v1.png' }}
									style={{ height: 30, width: 30, marginRight: 12 }}
								/>
							</View>
						</View>
						<View
							style={{
								display: 'flex',
								backgroundColor: '#FAFAFA',
								flexDirection: 'row',
								alignItems: 'center',
								width: '100%',
								borderRadius: 8,
								gap: 8,
								shadowColor: '#E86A33',
								shadowOffset: {
									width: 0,
									height: 0,
								},
								shadowOpacity: 0.5,
								shadowRadius: 1,
								elevation: 10,
								marginBottom: 12,
							}}
						>
							<Image
								source={require('../../assets/placeholder_background.jpg')}
								style={{ width: '20%', height: 80, borderRadius: 8 }}
							/>
							<View
								style={{
									display: 'flex',
									flexGrow: 1,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
										gap: 4,
									}}
								>
									<Text style={{ fontSize: 16, fontWeight: '700' }}>Lahan 1</Text>
									<View
										style={{
											backgroundColor: '#E86A33',
											paddingHorizontal: 8,
											paddingVertical: 4,
											borderRadius: 8,
										}}
									>
										<Text
											style={{
												fontSize: 12,
												color: '#FAFAFA',
												fontWeight: '400',
											}}
										>
											Jagung
										</Text>
									</View>
								</View>
								<Image
									source={{ uri: 'https://img.icons8.com/ios/50/forward--v1.png' }}
									style={{ height: 30, width: 30, marginRight: 12 }}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</View>
		</>
	)
}
