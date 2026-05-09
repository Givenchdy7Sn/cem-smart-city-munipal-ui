import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CremationService } from '../../services/cremation-booking.service';
import { DocumentService } from '../../services/document.service';
import { CremationBooking } from '../../models/cremation-booking.model';
import { Document } from '../../models/document.model';
import { CorrectionCommentHistory } from '../../models/correction-comment-history.model';
import { EnumToLabelPipe } from '../../core/pipes/enum-to-label.pipe';

@Component({
  selector: 'app-view-cremation-booking',
  imports: [CommonModule, FormsModule, EnumToLabelPipe],
  templateUrl: './view-cremation-booking.html',
  styleUrl: './view-cremation-booking.scss',
})
export class ViewCremationBooking implements OnInit {
    isSavingBurial = false;

    saveBurialDetails() {
      if (!this.booking || !this.booking.id || !this.booking.deceased) return;
      this.isSavingBurial = true;
      const deceased = this.booking.deceased;
      const burialDetails = {
        cemetery: deceased.cemetery,
        graveNumber: deceased.graveNumber,
        section: deceased.section,
        burialOrderNo: deceased.burialOrderNo,
        burialOrderDate: deceased.burialOrderDate,
        certificateNo: deceased.certificateNo,
        certificateDate: deceased.certificateDate,
      };
      this.cremationService.updateBurialDetails(this.booking.id, burialDetails).subscribe({
        next: () => {
          this.isSavingBurial = false;
          this.cdr.detectChanges();
          // Optionally show a success message
        },
        error: () => {
          this.isSavingBurial = false;
          this.cdr.detectChanges();
          // Optionally show an error message
        }
      });
    }
  booking: CremationBooking = {} as CremationBooking;
  isLoading = false;
  error: string | null = null;
  correctionComments = '';
  isSendingBack = false;
  isApproving = false;
  isRejecting = false;
  rejectionReason = '';
  showRejectForm = false;
  showCorrectionForm = false;
  correctionHistory: CorrectionCommentHistory[] = [];

  constructor(
    private cremationService: CremationService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBooking(Number(id));
    }
  }

  loadBooking(bookingId: number): void {
    this.isLoading = true;
    this.error = null;

    this.cremationService.getCremationBooking(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load cremation booking', err);
        this.error = 'Unable to load booking details.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });

    this.cremationService.getCorrectionHistory(bookingId).subscribe({
      next: (history) => {
        this.correctionHistory = history;
        this.cdr.detectChanges();
      },
      error: () => { /* silently ignore */ }
    });
  }

  downloadDocument(doc: Document): void {
    if (!doc.documentCloudId) {
      console.warn('Document missing document id', doc);
      return;
    }

    this.documentService.downloadDocument(doc.title, doc.documentCloudId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.title || 'document';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Failed to download document', err);
      },
    });
  }

  sendBackToFuneralParlour(): void {
    if (!this.booking || !this.correctionComments.trim()) {
      return;
    }

    this.isSendingBack = true;
    this.cremationService.sendBackToFuneralParlour(this.booking.id, this.correctionComments.trim(), 'Admin').subscribe({
      next: (booking) => {
        this.booking = booking;
        this.correctionComments = '';
        this.isSendingBack = false;
        this.showCorrectionForm = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to send back to funeral parlour', err);
        this.isSendingBack = false;
        this.cdr.detectChanges();
      },
    });
  }

  approveBooking(): void {
    if (!this.booking) return;

    this.isApproving = true;
    this.cremationService.approveBooking(this.booking.id).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.isApproving = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to approve booking', err);
        this.isApproving = false;
        this.cdr.detectChanges();
      },
    });
  }

  rejectBooking(): void {
    if (!this.booking || !this.rejectionReason.trim()) return;

    this.isRejecting = true;
    this.cremationService.rejectBooking(this.booking.id, this.rejectionReason.trim()).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.rejectionReason = '';
        this.isRejecting = false;
        this.showRejectForm = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to reject booking', err);
        this.isRejecting = false;
        this.cdr.detectChanges();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/cremation-bookings-dashboard']);
  }
}
