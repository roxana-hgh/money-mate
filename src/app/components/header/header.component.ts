import { Component, TemplateRef, inject } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private translationService: TranslationService) {}

  set_lang(lang: string) {
    this.translationService.setLanguage(lang);
  }
  private offcanvasService = inject(NgbOffcanvas)

  openMenu(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'start' });
	}

}
