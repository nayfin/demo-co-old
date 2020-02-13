import { Component, OnInit } from '@angular/core';
import { SidenavSection } from '@tft/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

 /**
  * @example
  * <example-url>https://stackblitz.com/github/nayfin/tft-documentation</example-url>
  */

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-co-docs';
  subtitle$: Observable<string>;

  linksToExamples: SidenavSection[] = [
    {
      title: 'Form Fields',
      subtitle: '',
      description: ``,
      links: [
        {
          title: 'Input Field',
          path: 'fields/input',
        }
      ],
    }
  ];
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.subtitle$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(endEvent => {
        return (endEvent as NavigationEnd).url
      })
    );

  }
  onLinkSelected(event) {
    console.log(event);
  }
}
