// Importiere Redux Toolkit Funktionen zum Erstellen von Slices und Aktionen
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
// Definiere das Interface für die Gericht-Datenstruktur
interface Gericht {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
 
// Definiere das Interface für den Speisekarten-Zustand
interface SpeisekarteState {
  gerichte: Gericht[]; // Array von Gericht-Objekten
  favoriten: number[]; // Array von Favoriten-IDs
}
 
// Definiere den initialen Zustand der Speisekarte
const initialState: SpeisekarteState = {
  gerichte: [], // Starte mit leeren Gerichten
  favoriten: JSON.parse(localStorage.getItem('favoriten') || '[]'), // Hole Favoriten aus Local Storage oder initialisiere mit leeren Array
};
 
// Erstelle ein Slice für die Speisekarte mit Reducers für das Ändern des Zustands
const speisekarteSlice = createSlice({
  name: 'speisekarte', // Name des Slices
  initialState, // Anfangszustand
  reducers: {
    // Reducer zum Setzen der Gerichte
    setGerichte(state, action: PayloadAction<Gericht[]>) {
      state.gerichte = action.payload; // Setze die Gerichte auf die übergebene Payload
    },
    // Reducer zum Umschalten eines Favoriten
    toggleFavorit(state, action: PayloadAction<number>) {
      const id = action.payload; // ID des zu ändernden Favoriten
      if (state.favoriten.includes(id)) {
        // Wenn die ID bereits in den Favoriten ist, entferne sie
        state.favoriten = state.favoriten.filter(favoritId => favoritId !== id);
      } else {
        // Andernfalls füge sie hinzu
        state.favoriten.push(id);
      }
      // Speichere die aktualisierten Favoriten im Local Storage als JSON
      localStorage.setItem('favoriten', JSON.stringify(state.favoriten));
    },
  },
});
 
// Exportiere die erzeugten Reducer-Aktionen (Actions)
export const { setGerichte, toggleFavorit } = speisekarteSlice.actions;
 
// Exportiere den reduzierten Zustand (Reducer) für die Verwendung in der Redux-Konfiguration
export default speisekarteSlice.reducer;