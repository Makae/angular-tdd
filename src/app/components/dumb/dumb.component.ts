import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  styleUrls: ['./dumb.component.scss']
})
export class DumbComponent implements OnInit {
  public content = 'dumb works!'

  @Input()
  public inputValue?: string;
  constructor() { }

  ngOnInit(): void {
  }

  public onButtonClick(): void {
    this.content = 'other content';
  }
}
