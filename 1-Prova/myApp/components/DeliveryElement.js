import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../NavigationService';

export default function DeliveryElement() {
    return (
        <TouchableOpacity
            style={styles.circle}
            onPress={() => navigate("Delivery")}
            activeOpacity={0.7}
        >
            <Text style={styles.text}>🚚</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30, // Rende il contenitore perfettamente circolare
        backgroundColor: '#FF8C00',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6, // Ombra per Android
        shadowColor: '#000', // Ombra per iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    }
});
