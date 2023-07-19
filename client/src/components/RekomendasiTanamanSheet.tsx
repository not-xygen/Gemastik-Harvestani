import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	ActivityIndicator,
	Keyboard,
} from 'react-native'
import { PortalHost, PortalProvider } from '@gorhom/portal'
import { useLahanContext } from '@/hooks/LahanHooks'
import { RecomendationParams } from '@/context/LahanContext'



export default function RekomendasiTanamanSheet() {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const [loading ,setLoading]= React.useState<Boolean>(false)
	const snapPoints = React.useMemo(() => ['90%', '50%'], [])
	const {recomen,recomendation} = useLahanContext()
	const [inputValues, setInputValues] = React.useState<RecomendationParams>({
		nitrogen: 0,
		phosphorous: 0,
		potash: 0,
		temperature: 0,
		humidity: 0,
		ph: 0,
		rainfall: 0,
	  })
	  const handleInputChange = (name: keyof RecomendationParams, value: string) => {
		const parsedValue = value.trim() !== '' ? parseFloat(value) : 0;
		setInputValues((prevValues: RecomendationParams) => ({
		  ...prevValues,
		  [name]: isNaN(parsedValue) ? 0 : parsedValue,
		}));
	  };
	


	const handleSheetChanges = React.useCallback((index: number) => {
	}, [])

	const onAddButtonPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	  }, []);

	const submit = async() => {
		Keyboard.dismiss()
		setLoading(true)
		await recomendation(inputValues)
		setLoading(false)
	}

	return (
		<View>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
                <Text style={{
                        backgroundColor: "#41644A",
                        paddingLeft : "30%",
                        paddingTop: 6.3,
                        paddingBottom: 6.3,
                        color : "white"  

                    }}>Dapatkan Rekomendasi Bibit</Text>
			</TouchableWithoutFeedback>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={1}
						snapPoints={snapPoints}
						onChange={handleSheetChanges}
						enablePanDownToClose={true}
					>
						<View style={styles.container}>
							<View style={styles.inputRowContainer}>
								<View style={styles.inputContainer}>
									<Text>N (Rasio Nitrogen )</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.nitrogen.toString()}
									keyboardType="numeric"
									placeholder="Masukkan rasio nitrogen"
									onChangeText={(value) => handleInputChange('nitrogen', value)}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text>P (Rasio Fosfor )</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.phosphorous.toString()}
									keyboardType="numeric"
									placeholder="Masukkan rasio fosfor"
									onChangeText={(value) => handleInputChange('phosphorous', value)}
									/>
								</View>
								</View>
								<View style={styles.inputRowContainer}>
								<View style={styles.inputContainer}>
									<Text>K (Rasio Kalium )</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.potash.toString()}
									keyboardType="numeric"
									placeholder="Masukkan rasio kalium"
									onChangeText={(value) => handleInputChange('potash', value)}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text>Suhu (°C)</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.temperature.toString()}
									keyboardType="numeric"
									placeholder="Masukkan suhu (°C)"
									onChangeText={(value) => handleInputChange('temperature', value)}
									/>
								</View>
								</View>
								<View style={styles.inputRowContainer}>
								<View style={styles.inputContainer}>
									<Text>Kelembaban (%)</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.humidity.toString()}
									keyboardType="numeric"
									placeholder="Masukkan kelembaban (%)"
									onChangeText={(value) => handleInputChange('humidity', value)}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text>pH</Text>
									<TextInput
									style={styles.inputField}
									value={inputValues.ph.toString()}
									keyboardType="numeric"
									placeholder="Masukkan nilai pH"
									onChangeText={(value) => handleInputChange('ph', value)}
									/>
								</View>
								</View>
								<View style={styles.inputRowContainer}>
									<View style={styles.inputContainer}>
										<Text>Hujan (mm)</Text>
										<TextInput
										style={styles.inputField}
										value={inputValues.rainfall.toString()}
										keyboardType="numeric"
										placeholder="Masukkan jumlah hujan (mm)"
										onChangeText={(value) => handleInputChange('rainfall', value)}
										/>
									</View>
								</View>

						{loading ? (
							<ActivityIndicator size="large" color="#00ff00" />
						) : (
							<View style={styles.buttonContainer}>
								<Text style={styles.loginText} onPress={submit}>Submit</Text>
							</View>
						)}
						</View>
						<View style={styles.recomenContainer}>
							<Image source={require('../../assets/icon.png')} style={styles.recomenImage} />
							<Text style={styles.recomenName}>Rekomendasi Bibit : {recomen}</Text>
						</View>
					</BottomSheetModal>
			{/* <PortalHost name="RekomendasiTanaman" /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
        width:'100%',
        height : '100%',

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
		flex: 1,
		gap: 6,
	},
	inputField: {
		width: "100%",
		paddingHorizontal: 12,
		paddingVertical: 9,
		backgroundColor: '#FAFAFA',
	},
	additionalContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	inputRowContainer: {
		display : 'flex',
		flexDirection : 'row',
		gap :10, 
		justifyContent : 'space-between'
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
	recomenContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	recomenImage: {
		marginTop : 60,
		// Add the necessary styling for the image
	},
	recomenName: {
		// Add the necessary styling for the name
	},
})
