import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { Message } from '../types';

interface ChatBubbleProps {
    message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    const handleCopy = () => {
        // Handle copy functionality
        console.log('Copy message:', message.content);
    };

    const handleShare = () => {
        // Handle share functionality
        console.log('Share message:', message.content);
    };

    const handleEdit = () => {
        // Handle edit functionality
        console.log('Edit message:', message.content);
    };

    if (isUser) {
        return (
            <View style={styles.userMessageContainer}>
                <View style={styles.userAvatar}>
                    <Ionicons name="person" size={16} color="#ffffff" />
                </View>
                <View style={styles.userMessageContent}>
                    <Text style={styles.userMessageText}>{message.content}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Ionicons name="pencil" size={16} color={theme.colors.text.secondary} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.agentMessageContainer}>
            <View style={styles.agentMessageHeader}>
                <View style={styles.agentAvatar}>
                    <Ionicons name="person" size={16} color={theme.colors.text.secondary} />
                </View>
                <View style={styles.agentMessageActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                        <Ionicons name="copy" size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                        <Ionicons name="share" size={16} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.agentMessageContent}>
                <Text style={styles.agentMessageText}>{message.content}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userMessageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: theme.spacing.sm,
        paddingHorizontal: 30,
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'theme.colors.surface',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.sm,
    },
    userMessageContent: {
        flex: 1,
        paddingVertical: theme.spacing.xs,
    },
    userMessageText: {
        fontSize: 15,
        color: theme.colors.text.primary,
        lineHeight: 22,
    },
    editButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.sm,
    },

    agentMessageContainer: {
        backgroundColor: theme.colors.surface,
        marginVertical: theme.spacing.sm,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 30,


    },
    agentMessageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    agentAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
    },
    agentMessageActions: {
        flexDirection: 'row',
        gap: theme.spacing.xs,
    },
    actionButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
    },
    agentMessageContent: {
        paddingTop: theme.spacing.xs,
    },
    agentMessageText: {
        fontSize: 15,
        color: '#a0a0a4',
        lineHeight: 22,
    },
});
