import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = { errorcode: "", messages: [] };
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage.messages.push(error.error.message);
        } else {
          // server-side error
          let errorlist = [];
          const dict = error.error;

          if (typeof error.error === "string") {
            errorlist.push(error.error)
          } else {
            for (const key in dict) {
              if (Array.isArray(dict[key])) {
                for (const index in dict[key]) {
                  errorlist.push(dict[key][index]);
                }
              } else {
                errorlist.push(dict[key]);
              }
            }
          }
          errorMessage.errorcode = `${error.status}`;
          errorMessage.messages = errorlist;
        }

        return throwError(errorMessage);
      })
    );
  }
}
