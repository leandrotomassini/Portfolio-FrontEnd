import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) {}

  isLogin = false;
  roles!: string[];
  authority!: string;

  ngOnInit(): void {
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
    // ---------- Modal de precarga ----------
    // let timerInterval: any;
    // Swal.fire({
    //   title: 'Recuperando datos del servidor...',
    //   icon: 'info',
    //   showCloseButton: true,

    //   html:
    //   '<p style="text-align: justify;">Hola! esta app recupera datos alojados en un servicio gratuito,'+
    //   ' por lo que la carga de la información puede llevar cierto tiempo (a veces MUCHO tiempo).<br/>'+
    //   '<br/> Gracias por tu paciencia! pronto migraré la app a un servicio de rendimiento aceptable.'+
    //     '<br/><br/>(Este mensaje se cerrará automaticamente en <strong></strong> segundos)<br/><br/></p>',
  
    //   timer: 10000, ---> TIEMPO EN MS
    //   timerProgressBar: true,

    //   didOpen: () => {
    //     const content:any = Swal.getHtmlContainer();
    //     const $ = content.querySelector.bind(content);
    //     Swal.showLoading();
    //     timerInterval = setInterval(() => {
    //       Swal.getHtmlContainer()!.querySelector('strong')!.textContent= (
    //       Swal.getTimerLeft()! / 1000
    //       ).toFixed(0);
    //     }, 100);
    //   },
    //   willClose: () => {
    //     clearInterval(timerInterval);
    //   },
    // });
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['home']);
  }


}
