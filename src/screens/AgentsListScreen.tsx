import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { AgentCard } from '../components/AgentCard';
import { CategoryChips } from '../components/CategoryChips';
import { Header } from '../components/Header';
import { useAgentStore } from '../store/agentStore';
import { theme } from '../theme';
import { Agent } from '../types';

export const AgentsListScreen: React.FC = () => {
    const navigation = useNavigation();
    const {
        agents,
        categories,
        activeCategory,
        setActiveCategory,
        setCurrentAgent
    } = useAgentStore();

    const filteredAgents = activeCategory === 'all'
        ? agents
        : agents.filter(agent => agent.category === activeCategory);

    const groupedAgents = filteredAgents.reduce((acc, agent) => {
        if (!acc[agent.category]) {
            acc[agent.category] = [];
        }
        acc[agent.category].push(agent);
        return acc;
    }, {} as Record<string, Agent[]>);

    const handleAgentPress = (agent: Agent) => {
        setCurrentAgent(agent);
        navigation.navigate('AgentHome' as never);
    };

    const renderAgentCard = ({ item }: { item: Agent }) => (
        <AgentCard agent={item} onPress={handleAgentPress} />
    );

    const getSectionTitle = (category: string) => {
        switch (category) {
            case 'social': return 'Social Media';
            case 'health': return 'Health';
            case 'sports': return 'Sports';
            default: return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Header title="Agents" />

                <CategoryChips
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategorySelect={setActiveCategory}
                />

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.entries(groupedAgents).map(([category, categoryAgents]) => (
                        <View key={category} style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{getSectionTitle(category)}</Text>
                                <TouchableOpacity>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color={theme.colors.text.secondary}
                                    />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                horizontal
                                data={categoryAgents}
                                renderItem={renderAgentCard}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.agentsList}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <View style={styles.activeNavItem}>
                            <Ionicons name="home" size={24} color={theme.colors.text.primary} />
                            <View style={styles.activeDot} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Ionicons name="grid" size={24} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Ionicons name="time" size={24} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Ionicons name="person" size={24} color={theme.colors.text.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: theme.spacing.sm,
        paddingBottom: 0,
    },
    content: {
        flex: 1,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    sectionTitle: {
        ...theme.typography.h2,
        fontSize: 18,
    },
    agentsList: {
        paddingHorizontal: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        marginHorizontal: -theme.spacing.md,
        marginBottom: -theme.spacing.sm,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.sm,
    },
    activeNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.colors.text.primary,
        marginTop: 2,
    },
});
