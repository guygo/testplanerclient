import {NgModule} from '@angular/core';
import { MatInputModule,MatChipsModule,MatCardModule,MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    exports: [
        MatSidenavModule,
        MatInputModule,
        MatChipsModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        MatMenuModule,
    ]
})
export class MyUsedModule {}