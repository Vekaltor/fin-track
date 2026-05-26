import {Toast} from '@core/components/toast/toast';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastService} from '@core/services/toast-service';
import {ToastType} from '@core/models/toast-type.enum';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe("Toast component", () => {
  let fixture: ComponentFixture<Toast>;
  let srv: ToastService;

  const getToastItems = (): DebugElement[] => fixture.debugElement.queryAll(By.css('[data-testid="toast-item"]'));
  const getToastMessages = (): string[] => fixture.debugElement.queryAll(By.css('[data-testid="toast-message"]'))
    .map((el: DebugElement) => el.nativeElement.textContent.trim());
  const getCancelButtons = (): DebugElement[] => fixture.debugElement.queryAll(By.css('[data-testid="toast-cancel"]'));

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [Toast]});
    fixture = TestBed.createComponent(Toast);
    srv = TestBed.inject(ToastService);
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render nothing when no toasts', (): void => {
    expect(getToastItems().length).toBe(0);
  });

  it('should render toast message in DOM', (): void => {
    srv.showMessage(ToastType.SUCCESS, 'Zapisano');
    fixture.detectChanges();

    expect(getToastMessages()).toEqual(['Zapisano']);
  });

  it('should render correct number of toasts', (): void => {
    srv.showMessage(ToastType.SUCCESS, 'pierwszy');
    srv.showMessage(ToastType.ERROR, 'drugi');
    srv.showMessage(ToastType.SUCCESS, 'trzeci');
    fixture.detectChanges();

    expect(getToastItems().length).toBe(3);
  });

  it('should remove middle toast when cancel button clicked', (): void => {
    srv.showMessage(ToastType.SUCCESS, 'pierwszy');
    srv.showMessage(ToastType.ERROR, 'drugi');
    srv.showMessage(ToastType.SUCCESS, 'trzeci');
    fixture.detectChanges();

    expect(getToastItems().length).toBe(3);
    getCancelButtons()[1].nativeElement.click();
    fixture.detectChanges();

    expect(getToastMessages()).toEqual(['pierwszy', 'trzeci']);
  });

  it('should remove toast from DOM after duration', (): void => {
    srv.showMessage(ToastType.ERROR, 'błąd', 3000);
    fixture.detectChanges();

    expect(getToastItems().length).toBe(1);

    vi.advanceTimersByTime(3001);
    fixture.detectChanges();

    expect(getToastItems().length).toBe(0);
  });
});
