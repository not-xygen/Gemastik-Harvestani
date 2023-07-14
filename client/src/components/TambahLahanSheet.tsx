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
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native'
import { Portal, PortalHost, PortalProvider } from '@gorhom/portal'
import { TambahTitikLahanSheet } from '@/components'
import { useLahanContext } from '@/hooks/LahanHooks'
import { LahanData } from '@/context/LahanContext'
import { EventEmitter } from 'expo-location'
import { LahanProvider } from '@/context/LahanProvider'

export default function TambahLahanSheet() {
	const bottomSheetRef = React.useRef<BottomSheet>(null)
	const [lahanData,setLahanData] = React.useState<any>()
	const snapPoints = React.useMemo(() => ['90%'], [])
	const {add} = useLahanContext()
	const handleSheetChanges = React.useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const onAddButtonPress = () => {
		bottomSheetRef?.current?.expand()
	}

	const onChangeNama = (event : NativeSyntheticEvent<TextInputChangeEventData>
		) => {
		setLahanData({
			...lahanData,
			"nama" : event.nativeEvent.text
		})
	}
	const onChangeAlamat = (event : NativeSyntheticEvent<TextInputChangeEventData>
		) => {
		setLahanData({
			...lahanData,
			"alamat" : event.nativeEvent.text
		})
	}
	const onChangeLuas = (event : NativeSyntheticEvent<TextInputChangeEventData>
		) => {
		setLahanData({
			...lahanData,
			"luas" : event.nativeEvent.text
		})
	}

	const submit = () => {
		add(lahanData)
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
				<PortalProvider>
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
								<TextInput placeholder="Masukkan Username" style={styles.inputField} onChange={onChangeNama}/>
							</View>
							<View style={styles.inputContainer}>
								<Text>Luas</Text>
								<TextInput placeholder="Masukkan Username" style={styles.inputField}onChange={onChangeLuas} />
							</View>
							<View style={styles.inputContainer}>
								<Text>Alamat</Text>
								<TextInput placeholder="Masukkan Username" style={styles.inputField} onChange={onChangeAlamat}/>
							</View>
							<TambahTitikLahanSheet />
							<Button title="Submit" onPress={submit}/>
						</View>
					</BottomSheet>
				</PortalProvider>
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
