import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
})
export class AdminComponent implements OnInit {
  public user = 'admin';

  constructor() {}

  ngOnInit() {}
}
