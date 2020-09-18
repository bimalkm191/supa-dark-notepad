import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CookieService } from 'ngx-cookie-service'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ToastrModule.forRoot({
    positionClass: 'toast-top-right'
  })],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [CookieService]
})
export class AppModule {}
