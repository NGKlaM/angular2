import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'HomePage';
  token = false;
  menuList = [
    {
      label: 'HomePage',
      link: '/homepage',
    },
    {
      label: 'Categoty',
      link: '/category',
    },
    {
      label: 'About Us',
      link: '/aboutus',
    },
    {
      label: 'Contact',
      link: '/contact',
    },
  ];
  ngOnInit(): void {
    let check = localStorage.getItem('token');

    if (check) {
      this.token = true;
    }
  }
  Logout() {
    localStorage.removeItem('token');
    this.token = false;
  }
}
