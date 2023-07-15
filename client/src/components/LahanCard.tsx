import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'

export default function LahanCard({nama} : any){
    return (
        <>
            <View
            style={{
                display: 'flex',
                backgroundColor: '#FAFAFA',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                borderRadius: 8,
                gap: 8,
                shadowColor: '#E86A33',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                elevation: 10,
                marginBottom: 12,
            }}
        >
            <Image
                source={require('../../assets/placeholder_background.jpg')}
                style={{ width: '20%', height: 80, borderRadius: 8 }}
            />
            <View
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 4,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{nama}</Text>
                    <View
                        style={{
                            backgroundColor: '#E86A33',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#FAFAFA',
                                fontWeight: '400',
                            }}
                        >
                            Jagung
                        </Text>
                    </View>
                </View>
                <Image
                    source={{ uri: 'https://img.icons8.com/ios/50/forward--v1.png' }}
                    style={{ height: 30, width: 30, marginRight: 12 }}
                />
            </View>
        </View>
        </>
    )
}