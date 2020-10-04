import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validarores.service';

@Component({
    selector: 'app-reactive',
    templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {

    forma: FormGroup;
    
    constructor(private fb: FormBuilder, private validadores: ValidadoresService) { 
        this.crearFormulario();
        this.cargarDataAlFormulario();
    }
  
    ngOnInit(): void { }

    get nombreNoValido() {
        return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
    }

    get apellidoNoValido() {
        return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
    }
    
    get correoNoValido() {
        return this.forma.get('correo').invalid && this.forma.get('correo').touched;
    }

    get localidadNoValida() {
        return this.forma.get('direccion.localidad').invalid && this.forma.get('direccion.localidad').touched;
    }

    get provinciaNoValida() {
        return this.forma.get('direccion.provincia').invalid && this.forma.get('direccion.provincia').touched;
    }

    get pasaTiempos() {
        return this.forma.get('pasaTiempos') as FormArray;
    }

    get passNoValida() {
        return this.forma.get('pass').invalid && this.forma.get('pass').touched;
    }

    get rePassNoValida() {
        const pass = this.forma.get('pass').value;
        const rePass = this.forma.get('rePass').value;

        return (pass === rePass) ? false : true;
    }

    get usuarioNoValido() {
        return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
    }

    crearFormulario() {
        this.forma = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            apellido: ['', [Validators.required, Validators.minLength(2), this.validadores.noAguirre]],
            correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            pass: ['', Validators.required],
            rePass: ['', Validators.required],
            usuario: ['', Validators.required, this.validadores.existeUsuario],
            direccion: this.fb.group({
                localidad: ['', Validators.required],
                provincia: ['', Validators.required]
            }),
            pasaTiempos: this.fb.array([])
        },{
            validators: this.validadores.passwordsIguales('pass', 'rePass')
        });
    }

    cargarDataAlFormulario() {
        this.forma.setValue({
            nombre: 'Sebasian',
            apellido: 'Aguirre0',
            correo: 'test@gmail.com',
            pass: '123',
            rePass: '123',
            usuario: 'Seba',
            direccion: {
                localidad: 'Lanus',
                provincia: 'Buenos Aires'
            },
            pasaTiempos: []
        })
    }

    agregarPasatiempo() {
        this.pasaTiempos.push(this.fb.control('Nuevo elemento', Validators.required))
    }

    borrarPasaTiempo(index:number) {
        this.pasaTiempos.removeAt(index);
    }

    guardar() {
        console.log(this.forma);
        if (this.forma.invalid) {
            return Object.values(this.forma.controls).forEach(control => {
                if (control instanceof FormGroup)
                    Object.values(control.controls).forEach(control => control.markAsTouched());
                else
                    control.markAsTouched();
            });
        }

        this.forma.reset();
        // this.forma.setValue({
        //     nombre: 'Sebasian',
        //     apellido: 'Aguirre',
        //     correo: 'test@gmail.com',
        //     direccion: {
        //         localidad: 'Lanus',
        //         provincia: 'Buenos Aires'
        //     },
        //     pasaTiempos: []
        // })
    }
}
