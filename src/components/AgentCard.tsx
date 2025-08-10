import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { Agent } from '../types';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 48) / 2.5; // 48 = padding left (16) + padding right (16) + spacing (16)

interface AgentCardProps {
    agent: Agent;
    onPress: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(agent)}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={agent.icon as any}
                        size={24}
                        color={theme.colors.text.secondary}
                    />
                </View>
                <Text style={styles.title}>{agent.name}</Text>
                <Text style={styles.description}>{agent.description}</Text>
                <View style={styles.actionButton}>
                    <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={theme.colors.text.secondary}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginRight: theme.spacing.md,
        width: cardWidth,
        minHeight: 140,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.sm,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 6,
        textAlign: 'center',
    },
    description: {
        fontSize: 11,
        fontWeight: '400',
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 14,
        marginBottom: theme.spacing.sm,
        paddingHorizontal: 4,
    },
    actionButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
});
