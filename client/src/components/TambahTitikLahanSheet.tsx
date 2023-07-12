import BottomSheet from '@gorhom/bottom-sheet'
import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Button } from 'react-native'
import { Portal, PortalHost } from '@gorhom/portal'

export default function TambahTitikLahanSheet() {
	const bottomSheetRef = React.useRef<BottomSheet>(null)
	const snapPoints = React.useMemo(() => ['90%'], [])

	const handleSheetChanges = React.useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const onAddButtonPress = () => {
		bottomSheetRef?.current?.expand()
	}

	return (
		<>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
				<Text>Tambah Titik Lahan</Text>
			</TouchableWithoutFeedback>
			<Portal>
				<BottomSheet
					ref={bottomSheetRef}
					index={-1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
					enablePanDownToClose={true}
				>
					<View style={styles.container}>
						<View style={styles.inputContainer}>
							<Text>Latitude</Text>
							<TextInput placeholder="Masukkan Nama Lahan" style={styles.inputField} />
						</View>
						<View style={styles.inputContainer}>
							<Text>Longitude</Text>
							<TextInput placeholder="Masukkan Alamat" style={styles.inputField} />
						</View>
						<Button title="Confirm" />
					</View>
				</BottomSheet>
			</Portal>

			<PortalHost name="custom_host" />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	contentContainer: {
		flex: 1,
		paddingLeft: 50,
	},
	bottomSheetTitle: {
		fontSize: 24,
		fontWeight: '500',
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
	map: {
		flex: 1,
	},
})
