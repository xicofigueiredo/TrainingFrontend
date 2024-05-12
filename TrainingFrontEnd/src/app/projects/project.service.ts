import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Projects} from "../models/projects";
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrlQ = 'https://localhost:7283/api/Project';
  private apiUrlC = 'https://localhost:7285/api/Project';
  constructor(private http: HttpClient) { }

  projectUpdated = new EventEmitter<void>();

  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(this.apiUrlQ);
  }

  getProject(projectId: number): Observable<Projects>{
    return this.http.get<Projects>(this.apiUrlQ + '/' + projectId);
  }

  // createProject(project: Projects): Observable<Projects> {
  //   return this.http.post<Projects>(this.apiUrlC, project);
  // }
  //
  // updateProject ( project: Projects): Observable<Projects> {
  //   return this.http.put<Projects>(this.apiUrlC + '/' + project.id, project);
  // }
  createProject(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(this.apiUrlC, project).pipe(
      tap(() => this.projectUpdated.emit())
    );
  }

  updateProject(project: Projects): Observable<Projects> {
    return this.http.put<Projects>(this.apiUrlC + '/' + project.id, project).pipe(
      tap(() => this.projectUpdated.emit())
    );
  }
}

