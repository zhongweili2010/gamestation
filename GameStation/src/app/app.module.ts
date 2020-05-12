import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HypDashboardComponent } from './hyp-dashboard/hyp-dashboard.component';
import { LoginComponent } from './login/login.component';
import { DemoComponent } from './demo/demo.component';
import { CsdQueryComponent } from './csd-query/csd-query.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    ErrorPageComponent,
    HomeComponent,
    HypDashboardComponent,
    LoginComponent,
    CsdQueryComponent
  ],
  imports: [
    AutoCompleteModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FileUploadModule,
    FormsModule,
    GrowlModule,
    HttpClientModule,
    InputTextModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    SplitButtonModule,
    TabMenuModule,
    TableModule,
    TabViewModule,
    ToastModule,
    TooltipModule
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
