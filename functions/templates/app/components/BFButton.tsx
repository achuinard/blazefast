import {Text, TouchableOpacity, StyleSheet} from "react-native";

type ButtonColor = 'primary' | 'light' | 'danger' | 'success' | 'warning' | 'info' | 'purple' | 'pink' | 'dark';

interface BFButtonProps {
    title: string;
    color?: ButtonColor;
    onPress?: () => void;
    disabled?: boolean;
}

const colorStyles: Record<ButtonColor, { bg: string; pressed: string }> = {
    primary: { bg: '#2563eb', pressed: '#1e40af' },
    light: { bg: '#e5e7eb', pressed: '#d1d5db' },
    danger: { bg: '#dc2626', pressed: '#991b1b' },
    success: { bg: '#16a34a', pressed: '#15803d' },
    warning: { bg: '#ca8a04', pressed: '#a16207' },
    info: { bg: '#4f46e5', pressed: '#3730a3' },
    purple: { bg: '#9333ea', pressed: '#7e22ce' },
    pink: { bg: '#db2777', pressed: '#be185d' },
    dark: { bg: '#4b5563', pressed: '#1f2937' },
};

const BFButton = ({title, color = 'primary', ...rest}: BFButtonProps) => {
    const colors = colorStyles[color];
    const textColor = color === 'light' ? '#1f2937' : '#ffffff';

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.bg }]}
            activeOpacity={0.8}
            {...rest}
        >
            <Text style={[styles.text, { color: textColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        padding: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default BFButton;
