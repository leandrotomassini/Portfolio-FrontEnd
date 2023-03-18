import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css'],
})

export class AgregarExperienciaComponent implements OnInit {
  @Input() id!: number;
  crearExperienciaForm!: FormGroup;
  imgPreview!: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.crearExperienciaForm.valueChanges.subscribe((selectedValue) => {
      this.imgPreview = selectedValue.imgUrl;
    });
  }

  private createForm() {
    this.crearExperienciaForm = this.formBuilder.group({
      cargo: '',
      empresa: '',
      imgUrl: '',
      fechaDesde: '',
      fechaHasta: '',
      descripcion: '',
    });
  }

  submitForm() {
    this.activeModal.close(this.crearExperienciaForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
