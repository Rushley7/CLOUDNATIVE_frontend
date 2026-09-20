import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private readonly msalService = inject(MsalService);
  private readonly msalBroadcastService = inject(MsalBroadcastService);
  private readonly destroying$ = new Subject<void>();

  readonly isLoggedIn = signal(false);
  readonly userName = signal('');

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe((result) => {
      if (result?.account) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    this.isLoggedIn.set(accounts.length > 0);

    let account = this.msalService.instance.getActiveAccount();
    if (!account && accounts.length > 0) {
      account = accounts[0];
      this.msalService.instance.setActiveAccount(account);
    }

    this.userName.set(account?.name ?? account?.username ?? '');
  }

  login(): void {
    this.msalService.loginRedirect({
      scopes: ['User.Read'],
      prompt: 'select_account',
    });
  }

  logout(): void {
    const account = this.msalService.instance.getActiveAccount();
    this.msalService.logoutRedirect({ account });
  }

  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
