import React from 'react';
import {ActivityIndicator} from 'react-native';

const BFSpinner = ({
    size = 20,
    color = '#cbd5e1',
    ...props
}: {
    size?: number | 'small' | 'large';
    color?: string;
}) => <ActivityIndicator color={color} size={size} {...props} />;

export default BFSpinner;
