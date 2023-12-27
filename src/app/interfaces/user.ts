export interface User {
  name: string;
  email: string;
  id: string;
  preferences: {
    selectedCategories: string[];
    selectedSubCategories: string[];
  };
}
