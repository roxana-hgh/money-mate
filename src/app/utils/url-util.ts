import { environment } from '../../environments/environment';

export function navigateTo(path: string): string {
  return `${environment.baseHref}${path}`;
}