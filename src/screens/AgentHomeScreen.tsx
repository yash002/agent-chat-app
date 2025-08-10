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
import { getSamplePrompts, useAgentStore } from '../store/agentStore';
import { theme } from '../theme';

export const AgentHomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const { currentAgent, createNewChat, addMessage, clearCurrentChat } = useAgentStore();
    const [inputText, setInputText] = React.useState('');

    // Clear current chat when entering this screen to ensure fresh state
    React.useEffect(() => {
        clearCurrentChat();
    }, [clearCurrentChat]);

    if (!currentAgent) {
        return null;
    }

    const samplePrompts = getSamplePrompts(currentAgent.id);

    const handleSendMessage = (message: string) => {
        if (!message.trim()) return;

        const chat = createNewChat(currentAgent.id); // Use createNewChat for fresh conversation
        addMessage(chat.id, {
            content: message,
            sender: 'user',
        });

        setInputText('');
        // Navigate to chat screen after sending message
        setTimeout(() => {
            navigation.navigate('AgentChat' as never);
        }, 100);
    };

    const handlePromptPress = (prompt: string) => {
        // Always create a new chat with sample messages for the specific prompt
        createNewChat(currentAgent.id, prompt);
        // Navigate to chat screen to show the sample conversation
        setTimeout(() => {
            navigation.navigate('AgentChat' as never);
        }, 100);
    };

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
                {/* Prompt Cards Content */}
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.promptsContainer}>
                        {samplePrompts.map((prompt, index) => (
                            <TouchableOpacity
                                key={prompt.id}
                                style={styles.promptCard}
                                onPress={() => handlePromptPress(prompt.text)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.promptText}>{prompt.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
                            onSubmitEditing={() => handleSendMessage(inputText)}
                            selectionColor={theme.colors.text.primary}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            autoCapitalize="none"
                            spellCheck={false}
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
                            onPress={() => handleSendMessage(inputText)}
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: theme.spacing.xl,
    },
    promptsContainer: {
        paddingHorizontal: 30,
    },
    promptCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70,
        marginBottom: theme.spacing.md,
    },
    promptText: {
        fontSize: 14,
        fontWeight: '400',
        color: theme.colors.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
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
