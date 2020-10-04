import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

    usuario = {
        nombre: 'Sebastian',
        apellido: 'Aguirre',
        email: 'test@gmail.com',
        pais: 'ARG',
        genero: 'M'
    }

    paises: any[] = [];

    constructor(private paisService: PaisService) { }
  
    ngOnInit(): void {
        this.paisService.getPaises()
            .subscribe(paises =>  {
                this.paises = paises;
                
                this.paises.unshift({
                    nombre: '[ Seleccione Pais ]',
                    codigo: ''
                });
            });
    }

    guardar( formulario: NgForm ) {
        if (formulario.invalid)
            Object.values(formulario.controls).forEach(control => control.markAsTouched());

        console.log(formulario);
    }
}
