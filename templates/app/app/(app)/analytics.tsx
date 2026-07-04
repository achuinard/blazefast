import React, {useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {BFText} from "@/components/BFText";
import BFTextInput from "@/components/BFTextInput";
import BFButton from "@/components/BFButton";

const AnalyticsScreen = () => {
    const [eventName, setEventName] = useState('');
    const [lastEventSent, setLastEventSent] = useState('');

    const logEvent = async () => {
        if (eventName) {
            await analytics().logEvent(eventName);
            setLastEventSent(eventName);
            setEventName('');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BFText style={styles.title}>Firebase Analytics Demo</BFText>

            <BFText style={styles.subtitle}>Log Custom Event</BFText>
            <BFTextInput
                value={eventName}
                onChangeText={setEventName}
                placeholder="Event Name"
            />
            <BFButton title={'Log Event'} onPress={logEvent}/>
            {lastEventSent && (
                <BFText style={styles.successText}><BFText
                    style={styles.bold}>{lastEventSent}</BFText> sent successfully.</BFText>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    successText: {
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default AnalyticsScreen;
