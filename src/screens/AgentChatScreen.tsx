import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ChatBubble } from '../components/ChatBubble';
import { useAgentStore } from '../store/agentStore';
import { theme } from '../theme';

export const AgentChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const { currentAgent, currentChat, addMessage, regenerateLastResponse } = useAgentStore();
    const [inputText, setInputText] = React.useState('');
    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        // Scroll to bottom when new messages arrive
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [currentChat?.messages?.length]);

    if (!currentAgent || !currentChat) {
        return null;
    }

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        addMessage(currentChat.id, {
            content: inputText,
            sender: 'user',
        });

        setInputText('');
    };

    const handleRegenerate = () => {
        regenerateLastResponse(currentChat.id);
    };

    // Check if the last message is from agent to show regenerate button
    const lastMessage = currentChat.messages[currentChat.messages.length - 1];
    const showRegenerateButton = lastMessage && lastMessage.sender === 'agent';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={24} color={'#757474'} />
                </TouchableOpacity>
                <Text style={styles.title}>Agent</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={'#757474'} />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContent}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesContainer}
                >
                    {currentChat.messages.map((message, index) => (
                        <ChatBubble key={message.id} message={message} />
                    ))}

                    {showRegenerateButton && (
                        <View style={styles.regenerateContainer}>
                            <TouchableOpacity
                                style={styles.regenerateButton}
                                onPress={handleRegenerate}
                            >
                                <Ionicons
                                    name="refresh"
                                    size={16}
                                    color={theme.colors.text.secondary}
                                    style={styles.regenerateIcon}
                                />
                                <Text style={styles.regenerateText}>Regenerate Response</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[
                                styles.input,
                                Platform.OS === 'web' && styles.webInput
                            ]}
                            placeholder="Send a message"
                            placeholderTextColor={theme.colors.text.tertiary}
                            value={inputText}
                            onChangeText={setInputText}
                            multiline={false}
                            returnKeyType="send"
                            onSubmitEditing={handleSendMessage}
                            selectionColor={theme.colors.text.primary}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            spellCheck={false}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
                            onPress={handleSendMessage}
                        >
                            <Ionicons
                                name="arrow-forward"
                                size={18}
                                color={inputText.trim() ? '#1a1a1a' : theme.colors.text.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 46,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    menuButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    messagesContainer: {
        paddingVertical: theme.spacing.md,
        flexGrow: 1,
        paddingBottom: 20,
    },
    regenerateContainer: {
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: 30,
    },
    regenerateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    regenerateIcon: {
        marginRight: theme.spacing.xs,
    },
    regenerateText: {
        fontSize: 14,
        color: theme.colors.text.secondary,
        fontWeight: '400',
    },
    inputContainer: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        backgroundColor: theme.colors.background,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: 10,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 8,
        height: 44,
        borderColor: '#fff',
        borderWidth: 0.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text.primary,
        paddingVertical: 0,
        height: 28,
        borderWidth: 0,
    },
    webInput: {
        outlineStyle: 'none' as any,
        outlineWidth: 0 as any,
        outlineColor: 'transparent' as any,
        boxShadow: 'none' as any,
    },
    sendButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: theme.spacing.sm,
        backgroundColor: 'transparent',
    },
    sendButtonActive: {
        backgroundColor: theme.colors.primary,
    },
});
