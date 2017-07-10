/**
 * SharedModule
 * Should contain *only* components, directives and pipes shared across entire app.
 * IMPORTANT: No providers should ever appear here.
 * This module can be imported into any other module (lazy-loaded or not).
 * Can contain other shared modules - just not providers directly.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const MODULES: any[] = [
  CommonModule,
  HttpModule,
  NoopAnimationsModule,
  ReactiveFormsModule,

  MaterialModule,
  MdInputModule,
  MdCheckboxModule
];

@NgModule({
  imports     : [ ...MODULES ],
  declarations: [],
  exports     : [ ...MODULES ]
})
export class SharedModule {
}
