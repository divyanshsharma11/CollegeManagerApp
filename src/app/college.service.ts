import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { College } from './college';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public getColleges(): Observable<College[]>{
    return this.http.get<College[]>('http://localhost:8080/college/all'); 
  }

  public addCollege(college: College): Observable<College>{
    return this.http.post<College>('http://localhost:8080/college/add',college);
  }
  public updateCollege(college:College): Observable<College>{
    return this.http.put<College>('http://localhost:8080/college/update',college);
  }
  public deleteCollege(id:number): Observable<void>{
    return this.http.delete<void>('http://localhost:8080/college/delete/${id}');
  }
}
