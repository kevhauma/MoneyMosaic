import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
})

export class HeaderComponent {
  breadcrumbsService = inject(BreadcrumbsService)
  breadcrumbs$ = this.breadcrumbsService.breadcrumbs$
  hasBreadcrumbs$ = this.breadcrumbs$.pipe(map(bcs => bcs && bcs.length > 0))

}
