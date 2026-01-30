import { useState, useEffect, useCallback } from 'react';
import { recipesRef, isConfigured, set, remove, onValue, ref } from '../firebase/config';
import { database } from '../firebase/config';

const STORAGE_KEY = 'recipes';

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load recipes
  useEffect(() => {
    if (isConfigured && recipesRef) {
      // Firebase: Listen for real-time updates
      const unsubscribe = onValue(recipesRef, (snapshot) => {
        const data = snapshot.val();
        const recipesList = data ? Object.values(data) : [];
        // Sort by creation date (newest first)
        recipesList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecipes(recipesList);
        setLoading(false);
      }, (error) => {
        console.error('Firebase read error:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // LocalStorage fallback
      const stored = localStorage.getItem(STORAGE_KEY);
      setRecipes(stored ? JSON.parse(stored) : []);
      setLoading(false);
    }
  }, []);

  // Save to localStorage when recipes change (fallback mode)
  useEffect(() => {
    if (!isConfigured && !loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }
  }, [recipes, loading]);

  // Add recipe
  const addRecipe = useCallback((recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    if (isConfigured && database) {
      const recipeRef = ref(database, `recipes/${newRecipe.id}`);
      set(recipeRef, newRecipe);
    } else {
      setRecipes(prev => [newRecipe, ...prev]);
    }

    return newRecipe;
  }, []);

  // Update recipe
  const updateRecipe = useCallback((id, updates) => {
    const updatedRecipe = {
      ...updates,
      id,
      updatedAt: new Date().toISOString()
    };

    if (isConfigured && database) {
      const recipeRef = ref(database, `recipes/${id}`);
      set(recipeRef, updatedRecipe);
    } else {
      setRecipes(prev => prev.map(r => r.id === id ? updatedRecipe : r));
    }
  }, []);

  // Delete recipe
  const deleteRecipe = useCallback((id) => {
    if (isConfigured && database) {
      const recipeRef = ref(database, `recipes/${id}`);
      remove(recipeRef);
    } else {
      setRecipes(prev => prev.filter(r => r.id !== id));
    }
  }, []);

  // Get single recipe
  const getRecipe = useCallback((id) => {
    return recipes.find(r => r.id === id);
  }, [recipes]);

  return {
    recipes,
    loading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe,
    isFirebaseEnabled: isConfigured
  };
}
