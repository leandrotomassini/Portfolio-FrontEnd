import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css'],
})
export class AgregarProyectoComponent implements OnInit {
  @Input() id!: number;
  @Input() cargarLista!: any;
  crearProyectoForm!: FormGroup;
  datosActual!: any;
  imgPreview!: any;

  private createForm() {
    this.crearProyectoForm = this.formBuilder.group({
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
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.crearProyectoForm.valueChanges.subscribe((selectedValue) => {
      this.imgPreview = selectedValue.imgUrl;
    });
  }
  
  submitForm() {
    this.activeModal.close(this.crearProyectoForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
