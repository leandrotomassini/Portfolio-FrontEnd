import { Component, OnInit, Input } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { AgregarProyectoComponent } from './agregar-proyecto/agregar-proyecto.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  constructor(
    private datosProyectos: ProyectosService,
    private modalService: NgbModal
  ) {}

  @Input() authority!: string;
  public miProyectos: any;
  public indice!: number;
  public cargado: boolean = false;

  ngOnInit(): void {
    this.datosProyectos.lista().subscribe((data) => {
      this.miProyectos = data;
      this.cargado = true;
    });
  }
  openDetalleModal(id: number): any {
    const modalRef = this.modalService.open(DetalleProyectoComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.id = id;
  }

  openAddFormModal() {
    const modalRef = this.modalService.open(AgregarProyectoComponent, {
      size: 'lg',
      scrollable: true,
    });

    modalRef.result.then((result) => {
      Swal.fire({
        title: 'Exito!',
        text: 'El proyecto fue agregado con éxito',
        icon: 'success',
        confirmButtonText: 'Volver',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
      this.datosProyectos.crear(result).subscribe((data) => {
        this.cargarLista();
      });
    });
  }

  visitarUrl(id: number) {
    //recorre el array miProyectos traido del servidor y busca el ID...

    for (let i = 0; i < this.miProyectos.length; i++) {
      if (this.miProyectos[i].id == id) {
        this.indice = i;
      }
    }

    if (
      this.miProyectos[this.indice].proyectoUrl === null ||
      this.miProyectos[this.indice].proyectoUrl === ''
    ) {
      return Swal.fire({
        title: 'Ups!',
        text: 'Este proyecto no está en línea! podés consultar el código fuente en esta sección.',
        icon: 'warning',
        confirmButtonText: 'Volver',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
    } else {
      return window.open(this.miProyectos[this.indice].proyectoUrl);
    }
  }

  openEditFormModal(id: number): any {
    //Abro el componente modal de editar elemento, pasandole el ID.

    const modalRef = this.modalService.open(EditarProyectoComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.id = id;

    // una vez que se cierra el modal con los datos nuevos, se pasan aca para ejecutar la llamada a la API

    modalRef.result.then((result) => {
      Swal.fire({
        title: 'Exito!',
        text: 'El proyecto fue actualizado con éxito',
        icon: 'success',
        confirmButtonText: 'Volver',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-success',
        },
      });
      this.datosProyectos.editar(result, id).subscribe((data) => {
        this.cargarLista();
      });
    });
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no puede deshacerse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminado!',
          text: 'El registro ha sido eliminado exitosamente.',
          icon: 'success',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        this.datosProyectos.borrar(id).subscribe((data) => {
          this.cargarLista();
        });
      }
    });
  }

  cargarLista() {
    this.datosProyectos.lista().subscribe((data) => {
      this.miProyectos = data;
    });
  }
}
