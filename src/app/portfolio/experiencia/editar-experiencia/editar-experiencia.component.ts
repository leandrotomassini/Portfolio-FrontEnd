import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css'],
})
export class EditarExperienciaComponent implements OnInit {

  @Input() id!: number;
  editarExperienciaForm!: FormGroup;
  datosActual!: any;
  imgPreview!: any;


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private miExperiencia: ExperienciaService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    //  Levanto los datos del form clickeado:

    this.miExperiencia.detalle(this.id).subscribe((data) => {
      this.datosActual = data;

      //una vez que se obtuvieron los datos del elemento seleccionado, los cargo en el formulario:

      this.actualizarForm();
    });

    
    this.editarExperienciaForm.valueChanges.subscribe((selectedValue) => {
      this.imgPreview = selectedValue.imgUrl;
    });
  }

  private createForm() {
    this.editarExperienciaForm = this.formBuilder.group({
      cargo: '',
      empresa: '',
      imgUrl: '',
      fechaDesde: '',
      fechaHasta: '',
      descripcion: '',
    });
  }

  submitEditForm() {
    this.activeModal.close(this.editarExperienciaForm.value);

  }

  closeModal() {
    this.activeModal.close();
  }

  actualizarForm() {
    this.editarExperienciaForm.setValue({
      cargo: this.datosActual.cargo,
      empresa: this.datosActual.empresa,
      imgUrl: this.datosActual.imgUrl,
      fechaDesde: this.datosActual.fechaDesde,
      fechaHasta: this.datosActual.fechaHasta,
      descripcion: this.datosActual.descripcion,
    });
  }

  actualizarPreview() {
    this.editarExperienciaForm.valueChanges.subscribe((selectedValue) => {});
  }
}
