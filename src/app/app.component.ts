import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { EditService } from './edit.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };

   constructor(private editService: EditService) { }

   public ngOnInit(): void {
    this.view = this.editService.pipe(map(data => process(data, this.gridState)));
     this.editService.getProducts();
   }

  // constructor(@Inject(EditService) editServiceFactory: any) {
  //   this.editService = editServiceFactory();
  // }

  // public ngOnInit(): void {
  //   this.view = this.editService.pipe(map(data => process(data, this.gridState)));

  //   this.editService.getProducts();
  // }
}
