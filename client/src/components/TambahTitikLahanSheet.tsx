import BottomSheet from '@gorhom/bottom-sheet'
import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Button } from 'react-native'
import { Portal, PortalHost } from '@gorhom/portal'
import MapView, { Marker } from 'react-native-maps'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { useState,useEffect } from 'react';
import { useLahanContext } from '@/hooks/LahanHooks'
import { LatLot } from '../context/LahanContext';
import { LahanProvider } from '@/context/LahanProvider';


export default function TambahTitikLahanSheet() {
	const bottomSheetRef = React.useRef<BottomSheet>(null)
	const snapPoints = React.useMemo(() => ['90%'], [])
	const {pin} = useLahanContext()
	const [currentLocation,setCurrentLocation] = useState<Location.LocationObject>()
	const [markerCoordinate,setMarkerCoordinate] = useState<any>()
	useEffect(() => {
		getLocation()	
	},[])

	const getLocation = async () => {
		try {
			let {status} = await Location.requestForegroundPermissionsAsync()
			if(status !== "granted"){
				return;
			}
			let location = await Location.getCurrentPositionAsync({})
			setCurrentLocation(location)
		} catch (error) {
			console.error("Error requesting location permission:", error);
		}
	}

	const handleSheetChanges = React.useCallback((index: number) => {
	}, [])

	const onAddButtonPress = () => {
		bottomSheetRef?.current?.expand()
	}

	const onMapClick = (event : any) => {
		setMarkerCoordinate(event.nativeEvent.coordinate)
	}

	const submit = (event : any) => {
		const latLot = {
			"lat" : parseFloat(markerCoordinate.latitude) ,
			"lon" : parseFloat(markerCoordinate.longitude)
		}
		pin(latLot)
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
						<MapView style={styles.map} provider={PROVIDER_GOOGLE} onPress={onMapClick} >
							<Marker
								coordinate={!markerCoordinate ? ({"latitude" : 0 , "longitude" : 0}) : markerCoordinate}
								title={"title"}
								description={"description"}
							/>
						</MapView>
						<Button title="Confirm" onPress={submit} />
					</View>
				</BottomSheet>
			</Portal>
			<PortalHost name="MapTitik" />
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
