export interface User {
  username: string,
  displayname: string,
  email: string,
  authorities: [{
    authority: string
  }]
}
