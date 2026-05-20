import { Component } from '@angular/core';
import {Logo} from '@shared/components/ui/logo/logo';

@Component({
  selector: 'app-brand',
  imports: [
    Logo
  ],
  templateUrl: './brand.html',
})
export class Brand {}
