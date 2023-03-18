import { Component, OnInit, Input } from '@angular/core';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarExperienciaComponent } from './agregar-experiencia/agregar-experiencia.component';
import { EditarExperienciaComponent } from './editar-experiencia/editar-experiencia.component';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  constructor(
    private datosExperiencia: ExperienciaService,
    private modalService: NgbModal
  ) {}

  public miExperiencia: any;
  @Input() authority!: string;

  ngOnInit(): void {
    this.cargarLista();
  }

  openAddFormModal() {
    const modalRef = this.modalService.open(AgregarExperienciaComponent, {
      size: 'lg',
      scrollable: true,
    });

    modalRef.result.then((result) => {
      this.datosExperiencia.crear(result).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La experiencia fue agregada con éxito',
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

    const modalRef = this.modalService.open(EditarExperienciaComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.id = id;

    // una vez que se cierra el modal con los datos nuevos, se pasan aca para ejecutar la llamada a la API

    modalRef.result.then((result) => {
      this.datosExperiencia.editar(result, id).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La experiencia fue actualizada con éxito',
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
        this.datosExperiencia.borrar(id).subscribe((data) => {
          this.cargarLista();
        });
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.miExperiencia, event.previousIndex, event.currentIndex);

    //console.log('Mi experiencia ahora tiene: ', this.miExperiencia);

    for (let i = 0; i <= this.miExperiencia.length - 1; i++) {
      this.miExperiencia[i].orden = i;
     }
    
  //console.log( 'Actualizando orden', this.miExperiencia);

  }

  guardarOrden() {
    for (let i = 0; i <= this.miExperiencia.length - 1; i++) {
      this.datosExperiencia
        .editar(this.miExperiencia[i], this.miExperiencia[i].id)
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

  cargarLista() {
    this.datosExperiencia.lista().subscribe((data) => {
      this.miExperiencia = data;

      this.miExperiencia.sort(function (a:any, b: any) {
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
    return this.miExperiencia;
  }
}
