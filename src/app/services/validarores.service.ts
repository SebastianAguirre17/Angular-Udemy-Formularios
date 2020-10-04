import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
    [s:string]: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ValidadoresService {

    constructor() { }

    noAguirre(control: FormControl): ErrorValidate {
        if (control.value?.toLowerCase() === 'aguirre') 
            return { noAguirre: true }
        
        return null;
    }

    existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'sna')
                    resolve({existe: true})
                else
                    resolve(null);
            }, 3500);
        });
    }

    passwordsIguales( pass1Name: string, pass2Name: string) {
        return (formulario: FormGroup) => {
            const pass1Control = formulario.controls[pass1Name];
            const pass2Control = formulario.controls[pass2Name];

            if (pass1Control.value === pass2Control.value)
                pass2Control.setErrors(null);
            else    
                pass2Control.setErrors({noEsIgual: true});
        }
    }
}
