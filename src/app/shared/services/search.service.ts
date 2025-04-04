import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSource = new Subject<string>();
  searchTerm$ = this.searchTermSource.pipe(
    debounceTime(300), // Wait 300ms after each keystroke before emitting the term
    distinctUntilChanged() // Only emit if the current value is different than the last
  );

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}
