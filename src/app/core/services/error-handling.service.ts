import {inject, Injectable} from '@angular/core';
import {AppError} from '../models/app-error.interface';
import {ErrorActions} from '../errors/error-actions';
import {ErrorCode} from '../models/error-code.type';
import {ErrorAction} from '../models/error-action.interface';
import {BusinessErrorCode} from '../models/business-error-code.enum';

@Injectable({providedIn: 'root'})
export class ErrorHandlingService {
  private actions: ErrorActions = inject(ErrorActions);

  private readonly extraActionsRegistry: Partial<Record<ErrorCode, ErrorAction[]>> = {
    [BusinessErrorCode.UNAUTHORIZED]: [this.actions.handleLogout],
  };

  public handle(error: AppError): void {
    this.actions.showToast.execute(error);
    const extraActions: ErrorAction[] = this.extraActionsRegistry[error.code] || [];
    extraActions.forEach((action: ErrorAction) => action.execute(error));
  }
}
