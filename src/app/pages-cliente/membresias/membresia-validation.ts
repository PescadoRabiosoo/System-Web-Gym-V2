import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { MembershipsService } from "src/app/services/memberships.service";

export class MembresiaValidation {
    static validateVacante(membershipsService: MembershipsService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return membershipsService.checkVacante(value.id).pipe(
                map(response => {
                    return response == true ? null : { notAvailable: true }
                })
            );
        };
    }
}