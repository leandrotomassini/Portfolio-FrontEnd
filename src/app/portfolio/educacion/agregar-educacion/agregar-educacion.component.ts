import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css'],
})
export class AgregarEducacionComponent implements OnInit {
  @Input() id!: number;
  crearEducacionForm!: FormGroup;
  imgPreview!: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.crearEducacionForm.valueChanges.subscribe((selectedValue) => {
      this.imgPreview = selectedValue.imgUrl;
    });
  }

  private createForm() {
    this.crearEducacionForm = this.formBuilder.group({
      curso: '',
      institucion: '',
      imgUrl: '',
      fechaDesde: '',
      fechaHasta: '',
      descripcion: '',
    });
  }
  
  submitForm() {
    this.activeModal.close(this.crearEducacionForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
