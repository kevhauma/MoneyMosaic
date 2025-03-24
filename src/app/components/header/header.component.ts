import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
})



export class HeaderComponent {
    breadcrumbs$ = inject(BreadcrumbsService).breadcrumbs$
}
