import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { Category } from '../types';

interface CategoryChipsProps {
    categories: Category[];
    activeCategory: string;
    onCategorySelect: (categoryId: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
    categories,
    activeCategory,
    onCategorySelect,
}) => {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {categories.map((category) => {
                    const isActive = category.id === activeCategory;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[styles.chip, isActive && styles.activeChip]}
                            onPress={() => onCategorySelect(category.id)}
                        >
                            {category.icon && (
                                <Ionicons
                                    name={category.icon as any}
                                    size={16}
                                    color={isActive ? '#000000' : '#ffffff'} // Fixed: Explicit colors
                                    style={styles.icon}
                                />
                            )}
                            <Text
                                style={[
                                    styles.text,
                                    isActive && styles.activeText
                                ]}
                                allowFontScaling={false} // Prevents scaling issues
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        paddingTop: 8, // Added top padding
    },
    container: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 8, // Increased from 0
        alignItems: 'center',
        gap: 12, // Better spacing between chips
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16, // Reduced from 18
        paddingVertical: 8, // Reduced from 22
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fixed: More visible background
        borderRadius: 20, // Increased from 15
        height: 36,
        minWidth: 60,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)', // Added border for visibility
    },
    activeChip: {
        backgroundColor: '#ffffff', // Fixed: Solid white background
        borderColor: '#ffffff',
    },
    text: {
        fontSize: 14,
        fontWeight: '500', // Increased from 400
        color: '#ffffff', // Fixed: Explicit white color
        textAlign: 'center',
    },
    activeText: {
        fontWeight: '600', // Increased from 500
        color: '#000000', // Fixed: Explicit black color for contrast
    },
    icon: {
        marginRight: 6, // Changed from marginLeft to marginRight
    },
});
