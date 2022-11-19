import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import { Tipo } from 'src/app/models/tipo.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { AddProductService } from './add-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  titulo: string = 'Agregar Producto'
  tipos: Tipo[];
  producto: Producto = new Producto();
  errores: string[];

  crearForm: FormGroup;

  constructor(public addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargarTipos();
  }

  public buildForm() {
    this.crearForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      enabled: [true],
      marca: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
    })
  }

  cargarTipos() {
    this.productsService.getTipos().subscribe(tipos => this.tipos = tipos)
  }

  save($event) {
    event.preventDefault();
    if (this.crearForm.valid) {
      const value = this.crearForm.value as Producto;
      console.log(value);
      this.productsService.create(value).subscribe(
        producto => {
          this.addProductService.notificarUpload.emit(producto);
          Swal.fire('Nuevo Producto', `El producto ${producto.nombre} se ha creado correctamente`, `success`)
          this.cerrarModal();
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error("Codigo del error desde el backend: " + err.status);
          console.error(err.error.errors);
        }
      );
    } else {
      this.crearForm.markAllAsTouched();
    }
  }


  get nombreField() {
    return this.crearForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.crearForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get stockField() {
    return this.crearForm.get('stock');
  }
  get stockFieldIsValid() {
    return (this.stockField.touched || this.stockField.dirty) && this.stockField.valid;
  }
  get stockFieldIsInvalid() {
    return (this.stockField.touched || this.stockField.dirty) && this.stockField.invalid;
  }
  get marcaField() {
    return this.crearForm.get('marca');
  }
  get marcaFieldIsValid() {
    return (this.marcaField.touched || this.marcaField.dirty) && this.marcaField.valid;
  }
  get marcaFieldIsInvalid() {
    return (this.marcaField.touched || this.marcaField.dirty) && this.marcaField.invalid;
  }
  get descripcionField() {
    return this.crearForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.invalid;
  }
  get tipoField() {
    return this.crearForm.get('tipo');
  }
  get tipoFieldIsValid() {
    return (this.tipoField.touched || this.tipoField.dirty) && this.tipoField.valid;
  }
  get tipoFieldIsInvalid() {
    return (this.tipoField.touched || this.tipoField.dirty) && this.tipoField.invalid;
  }


  cerrarModal() {
    this.addProductService.cerrarModal();
  }

}
