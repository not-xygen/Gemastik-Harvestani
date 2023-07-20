import { RekomendasiTanamanSheet, TambahTanaman } from '@/components';
import { useLahanContext } from '@/hooks/LahanHooks';
import { Image, ImageBackground, View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';  

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	headerContainer: { width: '100%', height: '30%' ,display:'flex'},
	headerBackground: {
		width: '100%',
		height: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerOverlay: {
		width: '100%',
		height: '100%',
		backgroundColor: '#222222',
		opacity: 0.5,
		position: 'absolute',
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#E86A33',
	},
	headerProfilePicture: {
		borderRadius: 100,
		width: 100,
		height: 100,
		display: 'flex',
		marginRight: 20,
		top: 20,
		zIndex: 2,
	},
	weatherContainer: {
		backgroundColor: '#FAFAFA',
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		width: '100%',
		height: 'auto',
		paddingHorizontal: 20,
		paddingVertical: 24,
		borderRadius: 8,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 24,
		zIndex: -1,
	},
	weatherTitle: { fontSize: 18, color: '#41644A' },
	weatherTemperatureContainer: {},
	weatherTemperatureDetailContainer: {},
	lahanContainer: {
		width: '100%',
		height: 'auto',
		paddingVertical: 24,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	iconContainer: {
		display:'flex',
		alignItems: 'center',
	}
})

// {nama,luas,alamat,user_id} : LahanData

export default function LahanDetail() {
	const {detailLahan} = useLahanContext()
	console.log(detailLahan)
    return (
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <ImageBackground
                source={require('../../assets/placeholder_background.jpg')}
                style={styles.headerBackground}
            >
                <View style={styles.headerOverlay} />
                <Text style={styles.headerTitle}>
					{detailLahan.nama}
				</Text>
				<Text style={{
					color: "#FAFAFA"
				}}>{detailLahan.alamat}</Text>
            </ImageBackground>
        </View>

		<View style={{
			display: "flex",
			paddingLeft: 10,
			paddingBottom: 4,
			paddingRight: 10
		}}>

			<Text style={{marginBottom : 10}}>Tambah Tanaman</Text>
			<TambahTanaman/>
			<Text style={{marginTop:20}}>Rekomendasi Bibit</Text>
			<RekomendasiTanamanSheet/>
			<Text style={{marginTop:20}}>Status</Text>
			<View style={{
				display : 'flex'
			}}>
			</View>
			<View style={{
				flexDirection : 'row',
				justifyContent: 'space-between',
			}}>
				<View  style={styles.iconContainer}>
					<MaterialCommunityIcons name="calendar" size={54} color="#48742C" />
					<Text>Ditanam</Text>
					<Text>3 Maret 2023</Text>
				</View>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons name="coolant-temperature" size={54} color="#ECB476" />
					<Text>Ditanam</Text>
					<Text>3 Maret 2023</Text>
				</View>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons name="water" size={54} color="#229BDE" />
					<Text>Ditanam</Text>
					<Text>3 Maret 2023</Text>
				</View>
			</View>
			</View>
        </View>
    )
}
