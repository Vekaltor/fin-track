import {Component, computed, inject, Signal} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {AuthService} from '@core/services/auth-service';

@Component({
  selector: 'app-logout-section',
  imports: [
    NgIcon,
    AppButton
  ],
  templateUrl: './logout-section.html',
})
export class LogoutSection {
  private readonly auth: AuthService = inject(AuthService);

  protected readonly initials: Signal<string | undefined> = computed(() =>
    this.fullName
      ? this.fullName?.split(" ").reduce((acc, curr) => acc + curr.toUpperCase().at(0), "")
      : this.email.at(0)
  )

  protected readonly fullName: string | undefined = this.auth.currentUser()?.name;
  protected readonly email: string = this.auth.currentUser()!.email;

  protected handleLogout(): void {
    this.auth.logout();
  }
}
