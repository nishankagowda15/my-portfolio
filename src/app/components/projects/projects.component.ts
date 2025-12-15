import { Component, AfterViewInit } from '@angular/core';
declare const bootstrap: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    document.querySelectorAll(".project-card img").forEach((el: any) => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        const modalImg = document.getElementById("modalImage") as HTMLImageElement;
        modalImg.src = el.src;

        const modalEl = document.getElementById("imageModal")!;
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      });
    });
  }
}
