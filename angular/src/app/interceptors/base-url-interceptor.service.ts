import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Location, LocationStrategy} from '@angular/common';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(private _locationStrategy: LocationStrategy) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url: string = req.url;
    if (!url.startsWith(this._locationStrategy.getBaseHref())) {
      url = Location.joinWithSlash(this._locationStrategy.getBaseHref(), url);
    }
    return next.handle(req.clone({url: url}));
  }
}
