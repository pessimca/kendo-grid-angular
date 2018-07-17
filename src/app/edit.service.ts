import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditService extends BehaviorSubject<any> {

  constructor(private http: HttpClient) {
    super([]);
  }

  private data: any[] = [];

  getProducts() {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.getProductsAPI()
      .pipe(
        tap(data => {
          this.data = data;
          console.log(data);
        }
        ))
      .subscribe(data => {
        super.next(data);
      });
  }

  getProductsAPI(): Observable<any[]> {
    return this.http.get(' http://localhost:3000/products')
      .pipe(
        map(res => <any[]>res)
      );
  }
}
