import {ToastService} from '@core/services/toast-service';
import {TestBed} from '@angular/core/testing';
import {ToastType} from '@core/models/toast-type.enum';
import {Signal} from '@angular/core';
import {Toast} from '@core/models/toast.interface';

describe('ToastService', (): void => {
  let srv: ToastService;
  let toasts: Signal<Toast[]>

  beforeEach((): void => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    srv = TestBed.inject(ToastService);
    toasts = srv.toasts;
  });

  afterEach((): void => {
    vi.useRealTimers();
  })

  it('should add new toast of type SUCCESS by showMessage method', (): void => {
    srv.showMessage(ToastType.SUCCESS, "message", 300);

    expect(toasts().length).toBe(1);
    expect(toasts()[0].type).toBe(ToastType.SUCCESS);
    expect(toasts()[0].message).toBe("message");
    expect(toasts()[0].duration).toBe(300);
  });

  it('should clear toast after time', () => {
    srv.showMessage(ToastType.ERROR, "error");
    vi.advanceTimersByTime(2000);
    expect(toasts().length).toBe(1);
    expect(toasts()[0].message).toBe("error");
    vi.advanceTimersByTime(3000);
    expect(toasts().length).toBe(0);
  });

  it('should clear toast before time', () => {
    srv.showMessage(ToastType.ERROR, "error");
    vi.advanceTimersByTime(2000);
    let errorToast: Toast = toasts()[0];
    expect(toasts().length).toBe(1);
    expect(errorToast.message).toBe("error");
    srv.cancelMessage(errorToast.id);
    expect(toasts().length).toBe(0);
  });

  it('should not call cancelMessage second time when toast manually cancelled', () => {
    srv.showMessage(ToastType.ERROR, 'error', 3000);

    const toastId: string = toasts()[0].id;
    const timeoutId: number = toasts()[0].timeoutId;
    const cancelSpy = vi.spyOn(srv, 'cancelMessage');

    srv.cancelMessage(toastId,timeoutId);
    expect(cancelSpy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(3000);
    expect(cancelSpy).toHaveBeenCalledTimes(1);

    expect(toasts().length).toBe(0);
  });

  it('should generate dynamic uuid', () => {
    srv.showMessage(ToastType.WARNING, "message");
    let firstToast: Toast = toasts()[0];
    srv.showMessage(ToastType.INFO, "message")
    let secondToast: Toast = toasts()[1];

    expect(firstToast.id).not.toEqual(secondToast.id);
  });

  it('should accumulation toasts', () => {
    srv.showMessage(ToastType.SUCCESS, 'one');
    srv.showMessage(ToastType.ERROR, 'two');
    srv.showMessage(ToastType.SUCCESS, 'three');

    expect(srv.toasts().length).toBe(3);
  });
})
