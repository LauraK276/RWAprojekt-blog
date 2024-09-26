import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Pravilno importaj AuthGuard

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);  // Injektiraj instancu AuthGuard-a
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token'); // Simuliraj token u localStorage
    const result = guard.canActivate();  // Pozovi canActivate
    expect(result).toBeTrue();  // Očekuj da će vratiti true
  });

  it('should redirect to login if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simuliraj da nema tokena
    const routerSpy = spyOn(guard['router'], 'navigate');  // Spy za router
    const result = guard.canActivate();  // Pozovi canActivate
    expect(result).toBeFalse();  // Očekuj da će vratiti false
    expect(routerSpy).toHaveBeenCalledWith(['/login']);  // Provjeri da je pozvan redirect
  });
});
