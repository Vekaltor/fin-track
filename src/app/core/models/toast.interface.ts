import {ToastType} from './toast-type.enum';

export interface Toast {
  id: string,
  message: string,
  duration: number,
  type: ToastType
}
