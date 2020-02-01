import { Component } from '@angular/core';
import { SidenavSection } from '@tft/core';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-co-docs';

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

  onLinkSelected(event) {
    console.log(event);
  }
}
