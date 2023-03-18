import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css'],
})
export class EditarProyectoComponent implements OnInit {
  @Input() id!: number;
  @Input() cargarLista!: any;
  editarProyectoForm!: FormGroup;
  datosActual!: any;
  imgPreview!: any;

  private createForm() {
    this.editarProyectoForm = this.formBuilder.group({
      titulo: '',
      imgUrl: '',
      descripcion: '',
      tecnologias: '',
      proyectoUrl: '',
      sourceCodeUrl: '',
    });
  }
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private miProyecto: ProyectosService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    //  Levanto los datos del form clickeado:

    this.miProyecto.detalle(this.id).subscribe((data) => {
      this.datosActual = data;

      //una vez que se obtuvieron los datos del elemento seleccionado, los cargo en el formulario:

      this.actualizarForm();
    });

    this.editarProyectoForm.valueChanges.subscribe((selectedValue) => {
      this.imgPreview = selectedValue.imgUrl;
    });
  }

  submitEditForm() {
    this.activeModal.close(this.editarProyectoForm.value);
  }

  closeModal() {
    this.activeModal.close();
  }

  actualizarForm() {
    this.editarProyectoForm.setValue({
      titulo: this.datosActual.titulo,
      imgUrl: this.datosActual.imgUrl,
      descripcion: this.datosActual.descripcion,
      tecnologias: this.datosActual.tecnologias,
      proyectoUrl: this.datosActual.proyectoUrl,
      sourceCodeUrl: this.datosActual.sourceCodeUrl,
    });
  }

  actualizarPreview() {
    this.editarProyectoForm.valueChanges.subscribe((selectedValue) => {});
  }
}
