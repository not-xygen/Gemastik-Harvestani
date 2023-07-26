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
import { TambahTitikLahanSheet } from '@/components'
import { useLahanContext } from '@/hooks/LahanHooks'
import { ActivityIndicator } from 'react-native'

export default function TambahLahanSheet() {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const [lahanData,setLahanData] = React.useState<any>()
	const snapPoints = React.useMemo(() => ['50%','90%'], [])
	const [loading,setLoading]= React.useState<Boolean>(false)
	const {add} = useLahanContext()
	const handleSheetChanges = React.useCallback((index: number) => {
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

	const submit = async () => {
		setLoading(true)
		await add(lahanData)
		setLoading(false)
	}

	return (
		<View style={{
			position: 'absolute',
			zIndex:1,
			bottom: 90,
			right: 90
		}}>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
				<Image
					source={{ uri: 'https://img.icons8.com/ios/50/000000/plus-math--v1.png' }}
					style={{
						padding: 30,
						backgroundColor: '#41644A',
						borderRadius: 100,
						position: 'absolute',
					}}
				/>
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
							{loading ? (
								<ActivityIndicator size="large" color="#00ff00" />
							) : (
								<View style={styles.buttonContainer}>
									<Text style={styles.loginText} onPress={submit}>Submit</Text>
								</View>
							)}
						</View>
					</BottomSheetModal>
		</View>
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
	},
})
