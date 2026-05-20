import { Component } from '@angular/core';
import {Logo} from '@shared/components/ui/logo/logo';

@Component({
  selector: 'app-auth-brand',
  standalone: true,
  imports: [
    Logo
  ],
  template: `
    <div class="flex items-center justify-center gap-2 mb-8">
      <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white">
        <app-logo className="w-12 h-12"/>
      </div>
      <span class="text-3xl font-bold text-gray-900">FinTrack</span>
    </div>
  `
})
export class AppBrand {}
