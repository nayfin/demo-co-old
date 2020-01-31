import { Component } from '@angular/core';
import { SidenavSection } from '@tft/core';

@Component({
  selector: 'demo-co-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-co-docs';

  appNavTree: SidenavSection[] = [
    {
      title: 'CRISPR Forms',
      subtitle: 'DNA driven forms',
      description: `Overview of CRISPR Forms`,
      links: [
        {
          title: 'Overview',
          path: 'crispr-forms-demo/overview',
        }
      ],
    }
  ]
  onLinkSelected(event) {
    console.log(event);
  }
}
