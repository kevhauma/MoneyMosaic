import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink,JsonPipe],
  templateUrl: './header.component.html',
})



export class HeaderComponent {
  breadcrumbsService = inject(BreadcrumbsService)
  breadcrumbLenght$ = this.breadcrumbsService.breadcrumbs$.pipe(map(bcs => bcs && bcs.length > 0))

  ngOnInit(){
   // this.breadcrumbsService.breadcrumbs$.pipe(mergeMap(() => this.breadcrumbLenght$,(bcs,length)=>([bcs,length]))).subscribe(([bcs,length])=>console.log(bcs,length))
  }
}
