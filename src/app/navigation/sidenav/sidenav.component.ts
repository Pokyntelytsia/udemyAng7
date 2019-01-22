import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<void> ();

  navLists = [
    {
      name: "Signup",
      icon: 'face',
      link: "/signup"
    },{
      name: "Login",
      icon: 'exit_to_app',
      link: "/login"
    },{
      name: "Training",
      icon: 'fitness_center',
      link: "/training"
    }
  ]

  onSidenavClose():void {
    this.closeEvent.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
