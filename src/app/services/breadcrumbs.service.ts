import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';

export type BreadCrumb = { label: string, url: string }

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  router = inject(Router);
  route = inject(ActivatedRoute)
  breadcrumbs$ = this.router.events.pipe(
    filter(e=>e instanceof ActivationEnd),
    map(() => this.createBreadcrumbs(this.route.root)),
    shareReplay()
  );

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const breadcrumb = { label: child.snapshot.routeConfig?.title?.toString() || '', url: url }
      if (breadcrumb.label)
        breadcrumbs.push(breadcrumb);
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}