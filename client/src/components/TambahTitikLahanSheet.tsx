import BottomSheet from '@gorhom/bottom-sheet'
import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput, Button } from 'react-native'
import { Portal, PortalHost } from '@gorhom/portal'
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import { useState,useEffect } from 'react';


export default function TambahTitikLahanSheet() {
	const bottomSheetRef = React.useRef<BottomSheet>(null)
	const snapPoints = React.useMemo(() => ['90%'], [])

	const [location, setLocation] = useState<any>(null);
  	const [errorMsg, setErrorMsg] = useState<any>(null);

	useEffect(() => {
		(async () => {
		
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
		console.log(location.coords)
	}

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
						<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
							latitude : location.coords.latitude,
							longitude : location.coords.latitude,
							latitudeDelta: 0,
							longitudeDelta: 0.0421,
						}}/>
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
