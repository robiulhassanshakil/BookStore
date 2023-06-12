import { NgModule } from '@angular/core';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { SharedModule } from '../shared/shared.module';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    BookRoutingModule,
    SharedModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzDropDownModule
  ]
})
export class BookModule { }
