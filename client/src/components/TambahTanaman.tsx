import { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, Button } from 'react-native'
import { useLahanContext } from '@/hooks/LahanHooks'
import { Picker } from '@react-native-picker/picker'
import { Bibit } from '@/context/LahanContext'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function TambahTanaman() {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null)
	const [selectedBibit, setselectedBibit] = React.useState()
	const pickerRef = React.useRef<any | null>(null)
	const snapPoints = React.useMemo(() => ['50%', '90%'], [])
	const [bibitData, setBibit] = React.useState<Bibit[] | undefined>(undefined)
	const [date, setDate] = React.useState({
		tanam: new Date(1598051730000),
		panen: new Date(1598051730000),
	})
	const [show, setShow] = React.useState(false)
	const { getBibit, tanam } = useLahanContext()

	React.useEffect(() => {
		getBibit()
			.then((data) => {
				setBibit(data) // Update the state with the fetched data
			})
			.catch((error) => {
				console.error('Error fetching bibit data:', error)
			})
	}, [])

	const handleSheetChanges = React.useCallback((index: number) => {
	}, [])

	const onAddButtonPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present()
	}, [])

	const submit = () => {
		tanam(selectedBibit)
	}
	const onChange = (event: any, name: any) => {
		const currentDate = new Date(event.nativeEvent.timestamp)
		setShow(false)
		setDate((prevData) => ({
			...prevData,
			[name]: currentDate,
		}))
	}

	const showMode = (currentMode: any) => {
		setShow(true)
	}

	const showDatepicker = () => {
		showMode('date')
	}

	return (
		<View>
			<TouchableWithoutFeedback onPress={onAddButtonPress}>
				<Text
					style={{
						backgroundColor: '#41644A',
						paddingLeft: '40%',
						paddingTop: 6.3,
						paddingBottom: 6.3,
						color: 'white',
					}}
				>
					Tambah Tanaman
				</Text>
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
						<Text>Bibit</Text>
						{bibitData ? (
							<Picker
								ref={pickerRef}
								selectedValue={selectedBibit}
								onValueChange={(itemValue) => setselectedBibit(itemValue)}
							>
								{bibitData?.map((bibit, index) => {
									return <Picker.Item label={bibit.nama} value={bibit.id} key={index} />
								})}
							</Picker>
						) : (
							<></>
						)}
					</View>
					<View style={styles.inputContainer}>
						<Text>Perikiraan Panen</Text>
						<Button onPress={showDatepicker} title="Perkiraan Panen" />
						{/* <Text>Tanam: {date.tanam.toLocaleString()}</Text> */}
						<Text>Panen: {date.panen.toLocaleString()}</Text>
						{show && (
							<>
								<DateTimePicker
									testID="panen"
									minimumDate={date.tanam}
									value={date.panen}
									is24Hour={true}
									onChange={(event) => onChange(event, 'panen')}
								/>
							</>
						)}
					</View>
					<Button title="Submit" onPress={submit} />
				</View>
			</BottomSheetModal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		width: '100%',
		height: '100%',
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
