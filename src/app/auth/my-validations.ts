import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";

export class MyValidations {
    static validateEmail(authService: AuthService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return authService.checkEmail(value).pipe(
                map(response => {
                    return response == true ? null : { notAvailable: true }
                })
            );
        };
    }
}