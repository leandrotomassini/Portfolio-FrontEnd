import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-agregar-habilidades',
  templateUrl: './agregar-habilidades.component.html',
  styleUrls: ['./agregar-habilidades.component.css'],
})
export class AgregarHabilidadesComponent implements OnInit {
  @Input() id!: number;
  crearHabilidadesForm!: FormGroup;
  avanceTag!: string;
  estiloAvance!: String;
  incremento!: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.crearHabilidadesForm.valueChanges.subscribe((selectedValue) => {
      this.avanceTag = selectedValue.avance;
    });
  }

  private createForm() {
    this.crearHabilidadesForm = this.formBuilder.group({
      titulo: '',
      avance: '',
    });
  }
  submitForm() {
    this.activeModal.close(this.crearHabilidadesForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
