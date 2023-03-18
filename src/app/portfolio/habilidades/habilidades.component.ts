import { Component, OnInit, Input } from '@angular/core';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarHabilidadesComponent } from './editar-habilidades/editar-habilidades.component';
import { AgregarHabilidadesComponent } from './agregar-habilidades/agregar-habilidades.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
})
export class HabilidadesComponent implements OnInit {
  constructor(
    private datosHabilidades: HabilidadesService,
    private modalService: NgbModal
  ) {}

  public miHabilidades: any;
  @Input() authority!: string;
  public estiloAvance!: string;

  ngOnInit(): void {
    this.cargarLista();
    this.cargarEstilo();
  }

  openAddFormModal() {
    const modalRef = this.modalService.open(AgregarHabilidadesComponent);

    modalRef.result.then((result) => {
      this.datosHabilidades.crear(result).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La habilidad fue agregada con éxito',
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

    const modalRef = this.modalService.open(EditarHabilidadesComponent);
    modalRef.componentInstance.id = id;

    // una vez que se cierra el modal con los datos nuevos, se pasan aca para ejecutar la llamada a la API

    modalRef.result.then((result) => {
      this.datosHabilidades.editar(result, id).subscribe((data) => {
        Swal.fire({
          title: 'Exito!',
          text: 'La habilidad fue modificada con éxito',
          icon: 'success',
          confirmButtonText: 'Volver',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        this.cargarLista();
        this.cargarEstilo();
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
        this.datosHabilidades.borrar(id).subscribe((data) => {
          this.cargarLista();
        });
      }
    });
  }

  cargarLista() {
    this.datosHabilidades.lista().subscribe((data) => {
      this.miHabilidades = data;
    });
  }
  cargarEstilo() {
    switch (this.estiloAvance) {
      case '30':
        this.estiloAvance = 'progress-30';
        break;
      case '45':
        this.estiloAvance = 'progress-45';
        break;
      case '60':
        this.estiloAvance = 'progress-60';
        break;
      case '75':
        this.estiloAvance = 'progress-75';
        break;
      case '90':
        this.estiloAvance = 'progress-30';
        break;
      default:
        this.estiloAvance = 'progress-95';
        break;
    }
  }
}
