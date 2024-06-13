// Importiere die notwendigen Module aus React
import React, { useEffect } from 'react';
// Importiere Axios, um HTTP-Anfragen zu machen
import axios from 'axios';
// Importiere Redux-Hooks, um auf den Store zuzugreifen und Aktionen zu dispatcch
import { useDispatch, useSelector } from 'react-redux';
// Importiere Typen für Dispatch und RootState aus dem Redux-Store
import { AppDispatch, RootState } from '../store/store';
// Importiere Aktionen aus dem speisekarteSlice
import { setGerichte, toggleFavorit } from '../store/speisekarte/speisekarteSlice.ts';
 
// Definiere das Interface für die Gericht-Datenstruktur
interface Gericht {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
 
// Definiere die Speisekarte-Komponente als eine React Functional Component (FC)
const Speisekarte: React.FC = () => {
  // Hole die dispatch-Funktion aus dem Redux-Hook
  const dispatch = useDispatch<AppDispatch>();
  // Selektiere die gerichte und favoriten aus dem Redux-Store
  const gerichte = useSelector((state: RootState) => state.Speisekarte.gerichte);
  const favoriten = useSelector((state: RootState) => state.Speisekarte.favoriten);
 
  // Verwende useEffect, um die Gerichte-Daten beim ersten Rendern der Komponente zu holen
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        // Dispatche die Aktion setGerichte mit den erhaltenen Daten
        dispatch(setGerichte(response.data));
      })
      .catch(error => {
        console.error("Es gab einen Fehler beim Laden der Daten!", error);
      });
  }, [dispatch]); // Abhängigkeit: Dispatch-Funktion
 
  // Verwende useEffect, um die Favoriten jedes Mal zu speichern, wenn sich der Zustand ändert
  useEffect(() => {
    // Speichere die Favoriten als JSON im LocalStorage
    localStorage.setItem('favoriten', JSON.stringify(favoriten));
  }, [favoriten]); // Dieser Effekt wird jedes Mal ausgeführt, wenn sich der Favoriten-Zustand ändert
 
  // Definiere eine Funktion, um ein Gericht als Favorit zu markieren oder die Markierung zu entfernen
  const handleFavoritToggle = (id: number) => {
    // Dispatche die Aktion toggleFavorit mit der ID des Gerichts
    dispatch(toggleFavorit(id));
  };
 
  // Render die Komponente
  return (
    <div>
      <h1>Speisekarte</h1>
      <ul>
        {gerichte.map(gericht => (
          <li key={gericht.id}>
            {/* Zeige den Titel und den Status des Gerichts an */}
            {gericht.title} - {gericht.completed ? 'Ja' : 'Nein'}€ {" "}
            {/* Schaltfläche zum Markieren oder Entmarkieren als Favorit */}
            <button onClick={() => handleFavoritToggle(gericht.id)}>
              {favoriten.includes(gericht.id) ? 'Unmark Favorit' : 'Mark Favorit'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
// Exportiere die Speisekarte-Komponente als Standardexport
export default Speisekarte;