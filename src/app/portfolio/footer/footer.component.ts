import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PerfilUsuarioService } from 'src/app/services/perfi-usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private datosPerfilUsuario: PerfilUsuarioService) { }
  public miPerfilUsuario: any;

  ngOnInit(): void {
    this.datosPerfilUsuario.lista().subscribe((data) => {
      this.miPerfilUsuario = data[0];
    });
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
      'Si estás buscando un profesional para tu proyecto, estoy a tu disposición. Me encantaría que conozcas más sobre mi formación y habilidades, por lo que te invito a explorar mi portafolio de proyectos y mi resumen de experiencia. Si estás interesado en contratarme o tienes alguna pregunta, no dudes en ponerte en contacto conmigo. También puedes encontrarme en diferentes canales de comunicación. Estaré encantado de poder hablar contigo y discutir cómo puedo ayudarte con tu proyecto.' +
      '</p>' +
      '<h6 class="font-weight-bold text-center mb-3"> También puedes encontrarme en los siguientes canales</h6>' +
      '<ul class=" social-list-color list-inline ">' +
      '<li class="vertical-align-middle list-inline-item "><a class="linkedin" href="https://www.linkedin.com/in/leandro-cosme-tomassini/" target="_blank"><i class="fab fa-linkedin-in fa-fw"></i></a></li>' +
      '<li class="align-items-center list-inline-item "><a class="github" href="https://github.com/leandrotomassini" target="_blank"><i class="fab fa-github-alt fa-fw"></i></a>' +
      '</ul></div></div></div></div></section></body>';
    Swal.fire({
      title: 'Contacto',
      width: 600,
      background: '#EAEAEA',
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
