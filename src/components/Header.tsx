import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

type HeaderProps = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    showAction?: boolean;
    actionIcon?: React.ComponentProps<typeof Ionicons>['name'];
    onAction?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = false,
    onBack,
    showAction = false,
    actionIcon = 'ellipsis-vertical',
    onAction,
}) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBack) return onBack();
        // default behavior
        (navigation as any).goBack?.();
    };

    return (
        <View style={styles.container}>
            <View style={styles.side}>
                {showBack ? (
                    <TouchableOpacity onPress={handleBack} style={styles.iconButton} accessibilityLabel="Back">
                        <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.iconPlaceholder} />
                )}
            </View>

            <View style={styles.titleWrap}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.side}>
                {showAction ? (
                    <TouchableOpacity onPress={onAction} style={styles.iconButton} accessibilityLabel="Action">
                        <Ionicons name={actionIcon} size={22} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.iconPlaceholder} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    side: {
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        padding: 6,
    },
    iconPlaceholder: {
        width: 24,
    },
    titleWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...theme.typography.h1,
        fontSize: 20,
        textAlign: 'center',
    },
});
