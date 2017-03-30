import { FormControl } from '@angular/forms';

export class CustomValidator {

    static NegativeNumberValidator(control: FormControl) {
        var value: number = control.value.toString().replace(/[^0-9]/g, '');
        if (value < 0)
            return { "Número inválido": true };
        return null;
    }

    static CepValidator(control: FormControl) {
        var value: String = control.value.toString().replace(/[^0-9]/g, '');
        if (value.length != 8)
            return { "CEP inválido": true };
        return null;
    }

    static EmailValidator(control: FormControl) {

        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(control.value))
            return { "E-mail inválido": true };
        return null;
    }

    static SelectValidator(control: FormControl){
        var value:number = control.value.toString();

        if(value == 0)
            return { "Selecione uma opção." : true };
        return null; 
    }
}
