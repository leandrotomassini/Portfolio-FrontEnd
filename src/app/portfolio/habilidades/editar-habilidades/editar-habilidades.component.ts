import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HabilidadesService } from 'src/app/services/habilidades.service';

@Component({
  selector: 'app-editar-habilidades',
  templateUrl: './editar-habilidades.component.html',
  styleUrls: ['./editar-habilidades.component.css'],
})

export class EditarHabilidadesComponent implements OnInit {

  @Input() id!: number;
  editarHabilidadesForm!: FormGroup;
  avanceTag!: string;
  estiloAvance!: String;
  incremento!: any;
  datosActual!: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private miHabilidades: HabilidadesService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    //  Levanto los datos del form clickeado:
    this.miHabilidades.detalle(this.id).subscribe((data) => {
      this.datosActual = data;
//una vez que se obtuvieron los datos del elemento seleccionado, los cargo en el formulario:
      this.actualizarForm();
    });
  }

  private createForm() {
    this.editarHabilidadesForm = this.formBuilder.group({
      titulo: '',
      avance: '',
    });
  }

  submitEditForm() {
    this.activeModal.close(this.editarHabilidadesForm.value);
  }

  closeModal() {
    this.activeModal.close();
  }

  actualizarForm() {
    this.editarHabilidadesForm.setValue({
      titulo: this.datosActual.titulo,
      avance: this.datosActual.avance,
    });
  }
}
