export class Credentials {
  constructor(public username?: string,
              public password?: string) {}

  basicAuth(): string {
    return 'Basic ' + btoa(this.username + ':' + this.password);
  }
}
