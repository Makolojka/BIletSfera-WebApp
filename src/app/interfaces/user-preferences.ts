export interface UserPreferences {
  success: boolean;
  preferences: {
    selectedCategories: string[];
    selectedSubCategories: string[];
  };
}
