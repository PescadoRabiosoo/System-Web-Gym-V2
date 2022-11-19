import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { MembershipsService } from "src/app/services/memberships.service";

export class MembreshipValidation {
    static validateName(membershipsService: MembershipsService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return membershipsService.checkName(value).pipe(
                map(response => {
                    return response == true ? null : { notAvailable: true }
                })
            );
        };
    }
}