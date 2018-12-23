import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { QuestionComponent } from "./components/question/question.component";


import { DataService } from "./services/data.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
