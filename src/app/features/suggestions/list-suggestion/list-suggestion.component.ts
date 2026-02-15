
// @Component: Angular decorator that marks this class as a component
// and provides metadata about it
import { Component } from '@angular/core';
import { Suggestion } from '../../../models/suggestion'; // TypeScript type import

@Component({
  selector: 'app-list-suggestion',    // CSS selector to use this component: <app-list-suggestion>
  templateUrl: 'list-suggestion.component.html',  // External HTML template file
  styleUrls: ['list-suggestion.component.css'],   // Component-scoped styles
})
export class ListSuggestionComponent {
  // Property bound to search input via [(ngModel)] - two-way binding
  searchTerm: string = '';

  // Array of suggestions displayed in template via *ngFor
   suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: `Suggestion pour organiser une journée de team building pour renforcer les
liens entre les membres de l'équipe.`,
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10,
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: `Proposition pour améliorer la gestion des réservations en ligne avec un
système de confirmation automatique.`,
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: `Mise en place d'un programme de récompenses pour motiver les employés
et reconnaître leurs efforts.`,
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0,
    },
    {
      id: 4,
      title: `Moderniser l'interface utilisateur`,
      description: `Refonte complète de l'interface utilisateur pour une meilleure expérience
      utilisateur.`,
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0,
    },
  ];

  // Array to store favorites - modified by addToFavorites()
  favorites: Suggestion[] = [];

  // Method called by (click) event binding on like button
  likeSuggestion(suggestion: Suggestion) {
    suggestion.nbLikes++;  // Direct mutation - increments likes count
  }

  // Method called by (click) event binding on favorite button
  addToFavorites(suggestion: Suggestion) {
    this.favorites.push(suggestion);  // Adds suggestion to favorites array
  }

  // Method called by [class] property binding to get CSS class based on status
  getclassByStatus(status: string): string {
    switch (status) {
      case 'acceptee':   return 'status-accepted';
      case 'refusee':    return 'status-refused';
      case 'en_attente': return 'status-pending';
      default:           return '';
    }
  }
}
