import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogin = false;
  roles!: string[];
  authority!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every((rol) => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    
  }

  navegarA(anchor: string) {
    this.scroller.setOffset([0, 80]);
    this.scroller.scrollToAnchor(anchor);
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['portfolio']);
    window.location.reload();
  }

  openContactoModal() {
    let htmlContent =
      '<body>' +
      '<section class="section">' +
      '<div class="container">' +
      '<div class="row">' +
      '<div class="contact-intro col-lg-8 mx-lg-auto">' +
      '<img class="profile-medium d-inline-block mx-auto rounded-circle mb-3" src="/assets/img/profile.jpg" alt=""/>' +
      '<div class="speech-bubble bg-white p-4 p-lg-5 shadow-sm">' +
      '<p class="text-start mb-3">' +
      'Si estás interesado en contratarme para tu proyecto, nos pongamos en contacto! ¿Querés conocer mas acerca ' +
      'de mi formación y de lo que puedo hacer? Date una vuelta por mi portfolio de proyectos</a>' +
      'y por el extracto de mi experiencia </p>' +
      '<h6 class="font-weight-bold text-center mb-3"> Tambien podés encontrarme en los siguientes canales</h6>' +
      '<ul class=" social-list-color list-inline ">' +
      '<li class="vertical-align-middle list-inline-item "><a class="linkedin" href="https://www.linkedin.com/in/leandro-cosme-tomassini/" target="_blank"><i class="fab fa-linkedin-in fa-fw"></i></a></li>' +
      '<li class="align-items-center list-inline-item "><a class="github" href="https://github.com/leandrotomassini" target="_blank"><i class="fab fa-github-alt fa-fw"></i></a>' +
      '</ul></div></div></div></div></section></body>';
    Swal.fire({
      title: 'Contacto',
      background: '#EAEAEA',
      width: 600,
      html: htmlContent,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonText: 'volver',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success',
      },
    });
  }
}
