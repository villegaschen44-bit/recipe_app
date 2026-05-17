import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipesStack', {
        screen: 'RecipeDetail',
        params: { recipe: item },
      })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.recipeCategory}>{item.category}</Text>
        <View style={styles.recipeMeta}>
          <Text style={styles.metaText}>⏱ {item.cookTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on a recipe to save it here
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#2D2D2D',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  list: {
    padding: 24,
    paddingTop: 8,
    gap: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2D2D2D',
  },
  recipeCategory: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 3,
  },
  recipeMeta: {
    marginTop: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#888',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 60,
    color: '#ccc',
    marginBottom: 16,
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
