import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import EmployeeService from '../services/EmployeeService'; // Import your EmployeeService

export default function MainScreen({ navigation }) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Send request to the server");
                const employees = await EmployeeService.getAll();
                setData(employees);
                console.log("Data received:", employees);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        const startAnimation = () => {
            Animated.timing(scaleAnimation, {
                toValue: 2,
                duration: 1000,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        };

        const initialize = async () => {

            startAnimation();


            await fetchData();
        };

        initialize();
    }, []);

    const showHomePage = () => {
        navigation.navigate("Home", {
            employee: data
        });
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Animated.View
                    style={[
                        styles.animatedContainer,
                        {
                            transform: [{ scale: scaleAnimation }],
                        },
                    ]}
                >
                    <Text style={styles.loadingText}>Loading...</Text>
                </Animated.View>
            ) : (
                showHomePage()
             )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedContainer: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'lightblue',
    },
    loadingText: {
        fontSize: 18,
        color: 'white',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
