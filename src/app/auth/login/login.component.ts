import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';
import { fadeTrigger } from '../../shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'block-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeTrigger]
})
export class LoginComponent implements OnInit {
  @HostBinding('@fadeBlock') a = true;

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
    ) {
      title.setTitle('Вход в систему');
      meta.addTags([
        {
        name: 'keywords',
        content: 'логин, вход, система'
        },
        {
        name: 'description',
        content: 'Страница для входа в систему'
        }
      ]);
     }


  ngOnInit() {

    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      // console.log(params);
      if (params['nowCanLoggin']) {
        this.showMessage({
          text: 'Теперь вы можете войти в систему',
          type: 'success'
        });
      } else if (params['accessDenied']) {
        this.showMessage({
          text: 'Вам нужно авторизоваться',
          type: 'warning'
        });
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage( message: Message ) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    console.log(this.form);
    this.usersService.getUserByEmail(this.form.value.email).subscribe((user: User) => {
      console.log(user);
      if (user) {
        if (user.password === this.form.value.password) {
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.authService.login(); // Логиним пользователя в систему
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage({text: 'Пароль неверный', type: 'danger'});
        }

      } else {
        this.showMessage( {
          text: 'Такого пользователя не существует',
          type: 'danger'
        });
      }
    });
  }

}
