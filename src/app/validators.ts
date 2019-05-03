import { AbstractControl } from '@angular/forms';


export function zipcodevalidateor(control:AbstractControl){

    if(control && (control.value !==null || control.value !==undefined)){
        const regex= new RegExp('^[0-9]{6}$');
        if(!regex.test(control.value)){
             return {
                 isError:true
             }
        }
    }
    return null;
}

export function passwordValidator(control:AbstractControl){

    if(control && (control.value !==null || control.value !==undefined)){
        const cnfpassValue=control.value;

        const passControl=control.root.get('password');
        if(passControl){
            const passvalue=passControl.value;
            if(passvalue !==cnfpassValue){
                return {
                    isError:true
                }
            }
        }
    }
    return null;
}


export function IFSCcodevalidator(control:AbstractControl){
    if(control && (control.value !==null || control.value !==undefined)){
        const regex= new RegExp('^[A-Za-z]{4}[0]{1}[0-9]{6}$');
        //const regex= new RegExp('^[A-Z|a-z]{4}[0][\d]{6}$');
        if(!regex.test(control.value)){
             return {
                 isError:true
             }
        }
    }
    return null;
}

export function MobileNovalidator(control:AbstractControl){
    if(control && (control.value !==null || control.value !==undefined)){
        const regex= new RegExp('^[0-9]{10}$');
        if(!regex.test(control.value)){
             return {
                 isError:true
             }
        }
    }
    return null;
}
