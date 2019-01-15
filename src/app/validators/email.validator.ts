import { ValidatorFn, AbstractControl } from "@angular/forms";

export function emailValidator():
ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | 
    null => {
        const invalid = !control.value.includes('@');
        console.log('invalid', invalid, control);
        return invalid ? {'invalidEmail': control.value} : null;
    };
} 