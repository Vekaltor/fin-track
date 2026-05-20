import { Component } from '@angular/core';

@Component({
  selector: 'app-test-demo-credentials',
  standalone: true,
  template: `
    <div class="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs">
      <p class="text-[10px] text-gray-400 uppercase mb-2">Dane testowe</p>
      <div class="space-y-1">
        <div class="flex justify-between">
          <span class="text-gray-500">Email:</span>
          <span class="font-mono text-gray-800">user&#64;user.pl</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Hasło:</span>
          <span class="font-mono text-primary font-bold">123</span>
        </div>
      </div>
    </div>
  `
})
export class TestDemoCredentials {}
