import BottomSheet from '@gorhom/bottom-sheet'
import * as React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	Button,
} from 'react-native'
import { Portal, PortalHost } from '@gorhom/portal'
import { TambahTitikLahanSheet } from '@/components'

export default function TambahLahanSheet() {
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
				<Image
					source={{ uri: 'https://img.icons8.com/ios/50/000000/plus-math--v1.png' }}
					style={{
						padding: 30,
						height: 30,
						width: 30,
						backgroundColor: '#41644A',
						top: '95%',
						left: '75%',
						borderRadius: 100,
					}}
				/>
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
							<Text>Nama Lahan</Text>
							<TextInput placeholder="Masukkan Username" style={styles.inputField} />
						</View>
						<View style={styles.inputContainer}>
							<Text>Luas</Text>
							<TextInput placeholder="Masukkan Username" style={styles.inputField} />
						</View>
						<View style={styles.inputContainer}>
							<Text>Alamat</Text>
							<TextInput placeholder="Masukkan Username" style={styles.inputField} />
						</View>
						<TambahTitikLahanSheet />
						<Button title="Submit" />
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
})
