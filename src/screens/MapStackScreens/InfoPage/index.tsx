import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from 'components/Card';

const InfoPage = () => {

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <Text style={styles.headerText}>Info</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.icon}>
                        <Text style={styles.text}>Bathroom Icon</Text>
                    </View>
                    <Text style={styles.text}>Bathroom</Text>
                </View>
                <View style={styles.column}>
                    <View style={styles.icon}>
                        <Text style={styles.text}>Score Icon</Text>
                    </View>
                    <Text style={styles.text}>Accessibility Score</Text>
                </View>
            </View>
            <View style={[styles.row, styles.twoColumns]}>
                <View style={styles.column}>
                    <Text style={styles.text}>Was this bathroom accessible?</Text>
                </View>
                <View style={styles.icon}>
                    <Text style={styles.text}>Thumbs Icon</Text>
                </View>
                <View style={styles.icon}>
                    <Text style={styles.text}>Thumbs Icon</Text>
                </View>
            </View>
            <View style={[styles.row, styles.twoColumns]}>
                <View style={styles.column}>
                    <Text style={styles.text}>Row 3, Column 1</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Row 3, Column 2</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.text}> Comments </Text>
                </View>
                <View style={styles.icon}>
                    <Text style={styles.text}>Add Comment Icon</Text>
                </View>
                <View style={[styles.row, styles.twoColumns]}></View>
            </View>
            <View style={[styles.row, styles.twoColumns]}>
                <View style={styles.icon}>
                    <Text style={styles.text}>Thumbs Icon</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Comment</Text>
                </View>
            </View>
            <View style={[styles.row, styles.twoColumns]}>
                <View style={styles.icon}>
                    <Text style={styles.text}>Thumbs Icon</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Comment</Text>
                </View>
            </View>
            <View style={[styles.row, styles.twoColumns]}>
                <View style={styles.icon}>
                    <Text style={styles.text}>Thumbs Icon</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Comment</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
        height: 80,
        width: 80,
        marginRight: 10,
        borderRadius: 40,
    },
    twoColumns: {
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});


export default InfoPage;
