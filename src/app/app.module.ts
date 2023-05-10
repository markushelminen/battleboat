import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GamegridComponent } from './gamegrid/gamegrid.component';
import { FormsModule } from '@angular/forms';
import { GamegridService } from './gamegrid/gamegrid.service';

@NgModule({
  declarations: [AppComponent, GamegridComponent],
  imports: [BrowserModule, FormsModule],
  providers: [GamegridService],
  bootstrap: [AppComponent],
})
export class AppModule {}
