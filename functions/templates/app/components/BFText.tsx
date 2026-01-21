import {Text, TextProps, StyleSheet, useColorScheme} from 'react-native';

export function BFText({style, ...rest}: TextProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Text
            style={[
                { color: isDark ? '#ffffff' : '#374151' },
                style
            ]}
            {...rest}
        />
    );
}
