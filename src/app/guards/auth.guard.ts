import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {

  const authStatus = inject(ApiService)
  const toaster = inject(ToastrService)
  const router= inject(Router)

  if(authStatus.isLoggedin()){
    return true
  }else{
    toaster.warning("Operation denied!!! Please Login")
    router.navigateByUrl('')
    return false
  }

};
