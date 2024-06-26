import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() onSubmitLoginEvent = new EventEmitter;

  login: string = '';
  password: string = '';

  onSubmitLogin() {
    console.log(this.login);
    this.onSubmitLoginEvent.emit({"login" : this.login, "password" : this.password});
  }
  

}
