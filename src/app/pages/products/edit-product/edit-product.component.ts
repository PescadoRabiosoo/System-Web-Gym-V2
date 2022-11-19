import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { Tipo } from 'src/app/models/tipo.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { EditProductService } from './edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnChanges {

  @Input() producto: Producto;
  tipos: Tipo[];
  titulo: string = 'Editar Producto N°'
  errores: string[];
  editForm: FormGroup;

  constructor(public editProductService: EditProductService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargarTipos();
  }

  public buildForm() {
    this.editForm = this.formBuilder.group({
      id: [this.producto.id],
      nombre: [this.producto.nombre, [Validators.required]],
      precio: [this.producto.precio, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
      marca: [this.producto.marca, [Validators.required]],
      descripcion: [this.producto.descripcion, [Validators.required]],
      tipo: [this.producto.tipo, [Validators.required]],
    });
  }

  cargarTipos() {
    this.productsService.getTipos().subscribe(tipos => this.tipos = tipos)
  }

  edit($event) {
    event.preventDefault();
    if (this.editForm.valid) {
      const value = this.editForm.value as Producto;
      this.productsService.update(value).subscribe(
        producto => {
          this.editProductService.notificarUpload.emit(producto.producto);
          Swal.fire('Producto Actualizado', `El producto ${value.nombre} se ha actualizado correctamente`, `success`)
          this.cerrarModal();
        },
      )
    }
  }

  get nombreField() {
    return this.editForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.editForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get marcaField() {
    return this.editForm.get('marca');
  }
  get marcaFieldIsValid() {
    return (this.marcaField.touched || this.marcaField.dirty) && this.marcaField.valid;
  }
  get marcaFieldIsInvalid() {
    return (this.marcaField.touched || this.marcaField.dirty) && this.marcaField.invalid;
  }
  get descripcionField() {
    return this.editForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.invalid;
  }
  get tipoField() {
    return this.editForm.get('tipo');
  }
  get tipoFieldIsValid() {
    return (this.tipoField.touched || this.tipoField.dirty) && this.tipoField.valid;
  }
  get tipoFieldIsInvalid() {
    return (this.tipoField.touched || this.tipoField.dirty) && this.tipoField.invalid;
  }

  cerrarModal() {
    this.editProductService.cerrarModal();
  }

}
