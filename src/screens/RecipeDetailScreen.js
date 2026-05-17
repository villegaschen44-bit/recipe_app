import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from '../contexts/FavoritesContext';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params;
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(recipe.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <TouchableOpacity
        style={[styles.fab, favorited && styles.fabActive]}
        onPress={() => toggleFavorite(recipe)}
      >
        <Text style={[styles.fabIcon, favorited && styles.fabIconActive]}>
          {favorited ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.category}>{recipe.category}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Prep Time</Text>
            <Text style={styles.metaValue}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Cook Time</Text>
            <Text style={styles.metaValue}>{recipe.cookTime}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Servings</Text>
            <Text style={styles.metaValue}>{recipe.servings}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((item, index) => (
            <View key={index} style={styles.ingredientRow}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  image: {
    width: '100%',
    height: 300,
  },
  fab: {
    position: 'absolute',
    top: 260,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  fabActive: {
    backgroundColor: '#FF6B35',
  },
  fabIcon: {
    fontSize: 26,
    color: '#FF6B35',
  },
  fabIconActive: {
    color: '#fff',
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D2D2D',
  },
  category: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D2D2D',
    marginTop: 4,
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E8E8E8',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    lineHeight: 24,
  },
});
