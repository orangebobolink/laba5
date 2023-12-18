import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

const Menu = () => {
    const [location, setLocation] = useState(null);
    const [policeStations, setPoliceStations] = useState([
        { name: 'ГАИ города Гомель', latitude: 52.39055292012281, longitude: 31.033592988098754 },
        { name: 'ГАИ города Гомель', latitude: 52.42979630210822, longitude: 30.994264919306964 },
    ]);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission not granted');
                    return;
                }

                // Set your coordinates for ГГТУ им. П.О. Сухого
                setLocation({ latitude: 52.406246140922065, longitude: 30.93926318882682 });
            } catch (error) {
                console.error('Error getting location:', error);
            }
        };

        getLocation();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location?.latitude || 52.406246140922065,
                    longitude: location?.longitude || 30.93926318882682,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        title="Your Location"
                    />
                )}

                {policeStations.map((station, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: station.latitude, longitude: station.longitude }}
                        title={station.name}
                        description="Police Station"
                        pinColor="blue"
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Menu;
