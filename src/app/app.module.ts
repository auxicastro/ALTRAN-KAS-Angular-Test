import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RenderTemperatureComponent } from './render-temperature/render-temperature.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RenderTemperatureComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule
    RouterModule.forRoot([
      { path: '', component: RenderTemperatureComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


 