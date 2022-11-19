import { AbstractControl } from "@angular/forms";
import { map } from "rxjs";
import { OnSiteService } from "src/app/services/on-site.service";

export class OnSiteValidation {
    static validateName(onSiteService: OnSiteService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return onSiteService.checkName(value).pipe(
                map(response => {
                    return response == true ? null : { notAvailable: true }
                })
            );
        };
    }
}