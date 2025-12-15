import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // IDs and labels for nav links
  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  activeAnchor = 'home';

  ngOnInit(): void {
    // set initial active based on scroll position
    this.onWindowScroll();
  }

  // Smooth scroll handler used by (click)
  scrollTo(event: Event, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // collapse mobile navbar (if open)
    const bsCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (bsCollapse && bsCollapse.classList.contains('show')) {
      // use Bootstrap's collapse if available
      try { (window as any).bootstrap.Collapse.getInstance(bsCollapse)?.hide(); }
      catch { /* ignore */ }
    }

    // compute offset to compensate for fixed navbar
    const y = el.getBoundingClientRect().top + window.scrollY - 90; // adjust 90 if navbar height differs
    window.scrollTo({ top: y, behavior: 'smooth' });
    this.activeAnchor = id;
  }

  // Update activeAnchor on scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.scrollY + 120; // offset to trigger earlier
    for (const link of this.navLinks) {
      const el = document.getElementById(link.id);
      if (!el) continue;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        this.activeAnchor = link.id;
        break;
      }
    }
  }
}
