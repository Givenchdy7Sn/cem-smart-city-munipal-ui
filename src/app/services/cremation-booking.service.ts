import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deceased } from '../models/deceased.model';
import { CremationBooking } from '../models/cremation-booking.model';
import { NextOfKin } from '../models/next-of-kin.model';
import { Document } from '../models/document.model';
import { CremationSlot } from '../models/cremation-slot.model';

@Injectable({
  providedIn: 'root'
})
export class CremationService {
  private apiUrl = 'http://localhost:8080/api/internal/v1/municipality/cremation';

  constructor(private http: HttpClient) {}

  createCremation(deceasedDate: Deceased | undefined): Observable<CremationBooking> {
    return this.http.post<CremationBooking>(`${this.apiUrl}/create`, deceasedDate);
  }

  updateDeceased(bookingId: number, deceasedData: Deceased): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/deceased`, deceasedData);
  }

  updateNextOfKin(bookingId: number, nextOfKinData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/kins`, nextOfKinData);
  }

  updateCremationSlot(bookingId: number, slotData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/slot`, slotData);
  }

  getDeceasedDetails(cremationId: number|undefined): Observable<Deceased> {
    return this.http.get<Deceased>(`${this.apiUrl}/${cremationId}/deceased`);
  }

  getNextOfKinDetails(cremationId: number|undefined): Observable<NextOfKin[]> {
    return this.http.get<NextOfKin[]>(`${this.apiUrl}/${cremationId}/kins`);
  }

  getCremationSlot(bookingId: number): Observable<CremationSlot> {
    return this.http.get<CremationSlot>(`${this.apiUrl}/${bookingId}/slot`);
  }

  getAllCremationBookings(): Observable<CremationBooking[]> {
    return this.http.get<CremationBooking[]>(`${this.apiUrl}/all`);
  }

  getCremationBooking(bookingId: number): Observable<CremationBooking> {
    return this.http.get<CremationBooking>(`${this.apiUrl}/${bookingId}`);
  }

  getCremationDocuments(bookingId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/${bookingId}/documents`);
  }

  submitDocuments(bookingId: number, documents: Document[]): Observable<Document[]> {
    return this.http.put<Document[]>(`${this.apiUrl}/${bookingId}/documents`, documents);
  }

  updateStep(bookingId: number, step: number): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/step`, step);
  }

  submitCremation(bookingId: number): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/submit`, null);
  }

  sendBackToFuneralParlour(bookingId: number, correctionComments: string, reviewedByName: string): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/corrections`, { correctionComments, reviewedByName });
  }

  approveBooking(bookingId: number): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/approve`, null);
  }

  rejectBooking(bookingId: number, reason: string): Observable<CremationBooking> {
    return this.http.put<CremationBooking>(`${this.apiUrl}/${bookingId}/reject`, { reason });
  }
}
