import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRecipes } from '../contexts/RecipeContext';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400';

export default function CreateRecipeScreen({ navigation }) {
  const { addRecipe } = useRecipes();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const splitLines = (value) =>
    value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

  const handleCreateRecipe = () => {
    const ingredientList = splitLines(ingredients);
    const instructionList = splitLines(instructions);

    if (!name.trim() || !category.trim() || !cookTime.trim()) {
      Alert.alert('Missing details', 'Please add a name, category, and cook time.');
      return;
    }

    if (ingredientList.length === 0 || instructionList.length === 0) {
      Alert.alert(
        'Missing recipe steps',
        'Please add at least one ingredient and one instruction.',
      );
      return;
    }

    const newRecipe = addRecipe({
      name: name.trim(),
      category: category.trim(),
      image: image.trim() || DEFAULT_IMAGE,
      prepTime: prepTime.trim() || 'N/A',
      cookTime: cookTime.trim(),
      servings: Number(servings) || 1,
      ingredients: ingredientList,
      instructions: instructionList,
    });

    Alert.alert('Success', 'Recipe created successfully.');
    navigation.replace('RecipeDetail', { recipe: newRecipe });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Recipe</Text>
          <Text style={styles.subtitle}>Add your own recipe to the list.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Recipe Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Chicken Adobo"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            placeholder="Example: Filipino"
            placeholderTextColor="#999"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Optional image link"
            placeholderTextColor="#999"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Prep Time</Text>
              <TextInput
                style={styles.input}
                placeholder="15 min"
                placeholderTextColor="#999"
                value={prepTime}
                onChangeText={setPrepTime}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Cook Time *</Text>
              <TextInput
                style={styles.input}
                placeholder="30 min"
                placeholderTextColor="#999"
                value={cookTime}
                onChangeText={setCookTime}
              />
            </View>
          </View>

          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            placeholder="4"
            placeholderTextColor="#999"
            value={servings}
            onChangeText={setServings}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Ingredients *</Text>
          <Text style={styles.helper}>Put one ingredient per line.</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={'1 cup rice\n2 cloves garlic\nSalt and pepper'}
            placeholderTextColor="#999"
            value={ingredients}
            onChangeText={setIngredients}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Instructions *</Text>
          <Text style={styles.helper}>Put one step per line.</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={'Prepare the ingredients\nCook until done\nServe warm'}
            placeholderTextColor="#999"
            value={instructions}
            onChangeText={setInstructions}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateRecipe}>
            <Text style={styles.buttonText}>Save Recipe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  form: {
    padding: 24,
    paddingTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  helper: {
    fontSize: 13,
    color: '#888',
    marginTop: -4,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    color: '#2D2D2D',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    minHeight: 120,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
