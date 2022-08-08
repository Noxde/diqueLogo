import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
})
export class NavItemComponent implements OnInit {
  @Input() label!: string;
  faAngleDown = faAngleDown;

  constructor() {}

  ngOnInit(): void {}
}
