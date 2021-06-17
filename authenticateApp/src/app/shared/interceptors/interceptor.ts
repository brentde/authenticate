import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable  } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private cookies: CookieService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let updatedReq = req;

        if(this.cookies.check('token')){       
            updatedReq = req.clone({
                headers: req.headers.set('Authorization', this.cookies.get('token'))
            })
        }
        
        return next.handle(updatedReq);
    }
}