import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import BFTextInput from "@/components/BFTextInput";
import {getFunctions, httpsCallable} from "@react-native-firebase/functions";
import {BFText} from "@/components/BFText";
import BFButton from "@/components/BFButton";

const CloudFunctionsScreen = () => {
    const [functionName, setFunctionName] = useState('httpsCallableSample');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);
    const [pending, setPending] = useState(false);

    const callFunction = () => {
        if (!functionName) {
            setError('Function name is required');
            return;
        }
        setPending(true);
        setError(null);
        setResult(null);
        httpsCallable(getFunctions(), functionName)().then((result) => {
            setResult(JSON.stringify(result.data));
        }).catch((error) => {
            setError(error.message);
        }).finally(() => setPending(false));
    };

    return (
        <View style={styles.container}>
            <BFText style={styles.title}>Cloud Functions Example</BFText>
            <BFText>If you deployed the BlazeFast starter cloud functions to your Firebase project, you should be able
                to call the <BFText style={styles.bold}>httpsCallableSample</BFText> function on this
                screen.</BFText>
            <View>
                <View style={styles.inputRow}>
                    <BFTextInput
                        style={styles.input}
                        value={functionName}
                        onChangeText={setFunctionName}
                        placeholder="Call a cloud function"
                    />
                    <BFButton title={'Call'} onPress={callFunction}/>
                </View>
                {error && <BFText style={styles.errorText}>{error}</BFText>}
                {pending && <BFText style={styles.loadingText}>Loading…</BFText>}
                {result && <BFText style={styles.successText}>{result}</BFText>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 4,
    },
    input: {
        flex: 1,
    },
    errorText: {
        color: '#ef4444',
    },
    loadingText: {
        color: '#3b82f6',
    },
    successText: {
        color: '#22c55e',
    },
});

export default CloudFunctionsScreen;
