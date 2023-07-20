import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet'
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
import { PortalHost, PortalProvider } from '@gorhom/portal'
import { TambahTitikLahanSheet } from '@/components'
import { useLahanContext } from '@/hooks/LahanHooks'

export default function TambahTanaman() {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const [lahanData,setLahanData] = React.useState<any>()
	const snapPoints = React.useMemo(() => ['50%', '90%'], [])
	const {add} = useLahanContext()
	const handleSheetChanges = React.useCallback((index: number) => {
		console.log('handleSheetChanges', index)
	}, [])

	const onAddButtonPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	  }, []);

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
		<View>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
                <Text style={{
                        backgroundColor: "#41644A",
                        paddingLeft : "40%",
                        paddingTop: 6.3,
                        paddingBottom: 6.3,
                        color : "white"  

                    }}>Tambah Tanaman</Text>
			</TouchableWithoutFeedback>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={1}
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
					</BottomSheetModal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
        width:'100%',
        height : '100%'
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
