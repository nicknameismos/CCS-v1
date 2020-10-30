import { IonicModule } from '@ionic/angular';
import { PinComponent } from './pin/pin.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [PinComponent],
    imports: [IonicModule],
    exports: [PinComponent]
})
export class ComponentsModule { }