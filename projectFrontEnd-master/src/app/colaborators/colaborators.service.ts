import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Colaborators} from "../models/colaborators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColaboratorsService {
  private apiUrlQ = 'https://localhost:5001/api/Colaborator';
  private apiUrlC = 'https://localhost:5011/api/Colaborator';

  constructor(private http: HttpClient) { }

  getColaborators(): Observable<Colaborators[]> {
    return this.http.get<Colaborators[]>(this.apiUrlQ);
  }

  createColaborator(colaborator: Colaborators): Observable<Colaborators> {
    return this.http.post<Colaborators>(this.apiUrlC, colaborator);
  }

}
