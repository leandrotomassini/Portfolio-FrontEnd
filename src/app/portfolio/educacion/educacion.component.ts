import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducacionService } from 'src/app/services/educacion.service';
import { AgregarEducacionComponent } from './agregar-educacion/agregar-educacion.component';
import { EditarEducacionComponent } from './editar-educacion/editar-educacion.component';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],

})
export class EducacionComponent implements OnInit {

  public miEducacion: any;
  @Input() authority!: string;

  constructor(
    private datosEducacion: EducacionService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.cargarLista();

  }

  openAddFormModal() {
    const modalRef = this.modalService.open(AgregarEducacionComponent, {
      size: 'lg',
      scrollable: true,
    });

    modalRef.result.then((result) => {
      this.datosEducacion.crear(result).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La educación fue agregada con éxito',
          icon: 'success',
          confirmButtonText: 'Volver',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        this.cargarLista();
      });
    });
  }

  openEditFormModal(id: number): any {
    //Abro el componente modal de editar elemento, pasandole el ID.

    const modalRef = this.modalService.open(EditarEducacionComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.id = id;

    // una vez que se cierra el modal con los datos nuevos, se pasan aca para ejecutar la llamada a la API

    modalRef.result.then((result) => {
      this.datosEducacion.editar(result, id).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La educación fue actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'Volver',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        this.cargarLista();
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.miEducacion, event.previousIndex, event.currentIndex);

    //console.log('Mi educacion ahora tiene: ', this.miEducacion);

    for (let i = 0; i <= this.miEducacion.length - 1; i++) {
      this.miEducacion[i].orden = i;
     }
    
  //console.log( 'Actualizando orden', this.miEducacion);

  }

  guardarOrden() {
    for (let i = 0; i <= this.miEducacion.length - 1; i++) {
      this.datosEducacion
        .editar(this.miEducacion[i], this.miEducacion[i].id)
        .subscribe();
    }
    Swal.fire({
      title: 'Exito!',
      text: 'El orden fue actualizado con éxito!',
      icon: 'success',
      confirmButtonText: 'Volver',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success',
      },
    });
    this.cargarLista();
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
          customClass: { confirmButton: 'btn btn-success' },
        });
        this.datosEducacion.borrar(id).subscribe((data) => {
          this.cargarLista();
        });
      }
    });
  }

  cargarLista() {
    this.datosEducacion.lista().subscribe((data) => {
      this.miEducacion = data;

      this.miEducacion.sort(function (a:any, b: any) {
        if (a.orden > b.orden) {
          return 1;
        }
        if (a.orden < b.orden) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    });
    return this.miEducacion;
  }
}
