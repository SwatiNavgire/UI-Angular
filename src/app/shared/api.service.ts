import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http'
import { map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

const myheader =
{
  headers:new HttpHeaders({'Content-type' : 'application/json',
  'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,PUT,POST,DELETE'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 httpOptions = {​​​​​​​​ headers: new HttpHeaders({​​​​​​​​ 'Content-Type': 'application/json' }​​​​​​​​) }​​​​​​​​;

 

  constructor(private http : HttpClient) { }

  postStaff(data : any){
    console.log('Data',data)
    return this.http.post<any[]>(environment.staffUrl+'/saveStaff', data, this.httpOptions)
    //.pipe(map((res:any)=>{
     // return res;
   // }))
  }

  getStaff(data : any){
    
        return this.http.get<any>(environment.staffUrl+'/view-staff', data)
  //  .pipe(map((res:any)=>{
    //  return res;
    //}))
  }
  updateStaff(data : any){
    return this.http.put<any>(environment.staffUrl+'/edit', data)
   // .pipe(map((res:any)=>{
     // return res;
    //}))
  }

  deleteStaff(staffId: number, data : any){
    return this.http.delete<any>(environment.staffUrl+'/delete/'+staffId, data)
   // .pipe(map((res:any)=>{
     // return res;
    //}))
  }
}
