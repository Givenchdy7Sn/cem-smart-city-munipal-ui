import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = '/app/api/internal/v1/municipality/documents';

  constructor(private http: HttpClient) {}

  downloadDocument(fileName: string, eTag: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, {
      params: { fileName, eTag },
      responseType: 'blob'
    });
  }
}
