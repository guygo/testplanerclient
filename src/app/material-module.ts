import {NgModule} from '@angular/core';
import { MatInputModule,MatChipsModule,MatCardModule,MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
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
    ]
})
export class MyUsedModule {}