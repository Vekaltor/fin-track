import {ChangeDetectionStrategy, Component, inject, model, ModelSignal} from '@angular/core';
import {Router} from '@angular/router';
import {email, FieldTree, form, required, submit} from '@angular/forms/signals';
import {firstValueFrom} from 'rxjs';
import {AuthService} from '@core/services/auth-service';
import {EmailField} from '@shared/components/forms/email-field/email-field';
import {PasswordField} from '@shared/components/forms/password-field/password-field';
import {TestDemoCredentials} from '@features/auth/components/test-demo-credentials/test-demo-credentials';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {AppBrand} from '@features/auth/components/auth-brand/auth-brand';


interface LoginData {
  email: string;
  password: string;
}

@Component({
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
  imports: [EmailField, PasswordField, TestDemoCredentials, AppButton, AppBrand],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginView {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  protected loginModel: ModelSignal<LoginData> = model<LoginData>({
    email: '',
    password: '',
  });

  protected loginForm = form(this.loginModel, (schema): void => {
    required(schema.email, {message: "Email jest wymagany"});
    email(schema.email, {message: "Email nie jest poprawny"});
    required(schema.password, {message: "Hasło jest wymagane"});
  }, {
    submission: {
      action: (instance) => this.onLogin(instance),
    }
  });

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loginForm().markAsTouched();
    void submit(this.loginForm);
  }

  private async onLogin(formInstance: FieldTree<LoginData>): Promise<void> {
    const email: string = formInstance.email().value();
    const password: string = formInstance.password().value();

    try {
      await firstValueFrom(this.auth.login(email, password));
      void this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Błąd logowania:', err);
    }

    return undefined;
  }

}
