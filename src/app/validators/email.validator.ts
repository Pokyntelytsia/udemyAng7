import { ValidatorFn, AbstractControl } from "@angular/forms";

export function emailValidator():
ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | 
    null => {
        const invalid = !control.value.includes('@');
        return invalid ? {'invalidEmail': control.value} : null;
    };
} 