import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import recipes, { categories } from '../data/recipes';

export default function RecipeListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <View style={styles.recipeNameRow}>
          <Text style={styles.recipeName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.recipeCategory}>{item.category}</Text>
        </View>
        <View style={styles.recipeMeta}>
          <Text style={styles.metaText}>{item.cookTime}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{item.servings} servings</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>What's cooking</Text>
        <Text style={styles.title}>today?</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.recipesList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No recipes found</Text>
            <Text style={styles.emptySubtitle}>
              Try a different search or category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2D2D2D',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    color: '#2D2D2D',
  },
  categoriesWrapper: {
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  categoryChipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  recipesList: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  recipeInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  recipeNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D2D2D',
    flexShrink: 1,
  },
  recipeCategory: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#888',
  },
  metaDot: {
    fontSize: 13,
    color: '#ccc',
    marginHorizontal: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
