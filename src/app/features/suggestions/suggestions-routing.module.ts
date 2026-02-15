import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [{ 
  path: '', component: SuggestionsComponent, children:[//madem 3mlt children lena lezem tzid router outlet bech y9raa eli th7thaa bech tjinijim tfficihih fi wstoo 
    { path: 'list', component: ListSuggestionComponent },
    { path: 'details/:id', component: SuggestionDetailsComponent },
    { path: 'list/add', component: SuggestionFormComponent },


] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
