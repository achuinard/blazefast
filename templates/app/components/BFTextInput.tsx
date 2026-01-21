import {TextInput, TextInputProps, StyleSheet, useColorScheme} from "react-native";

const BFTextInput = ({style, ...rest}: TextInputProps) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <TextInput
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            style={[
                styles.input,
                {
                    borderColor: isDark ? '#9ca3af' : '#d1d5db',
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    color: isDark ? '#ffffff' : '#1f2937',
                },
                style
            ]}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
});

export default BFTextInput;
