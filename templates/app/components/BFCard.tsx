import React from 'react';
import {View, ViewProps, StyleSheet, useColorScheme} from 'react-native';

const BFCard: React.FC<ViewProps> = ({children, style, ...rest}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: isDark ? '#374151' : '#ffffff' },
                style
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default BFCard;
