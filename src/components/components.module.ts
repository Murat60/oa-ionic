import { NgModule } from '@angular/core';
import { GeneralSearchBarComponent } from './search-bar/search-bar';
import { FiltersComponent } from './filters/filters';
@NgModule({
	declarations: [GeneralSearchBarComponent,
    FiltersComponent,
    ],
	imports: [],
	exports: [GeneralSearchBarComponent,
    FiltersComponent,
    ]
})
export class ComponentsModule {}
