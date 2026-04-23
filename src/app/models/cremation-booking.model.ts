import { CremationBookingStatusEnum } from '../core/enums/cremation-booking-status.enum';
import { CremationSlot } from './cremation-slot.model';
import { CremationTariff } from './cremation-tariff.model';
import { Deceased } from './deceased.model';
import { NextOfKin } from './next-of-kin.model';
import { Document } from './document.model';

export interface CremationBooking {
  // Basic Booking Information
  id: number;
  bookingRef: string;
  status: CremationBookingStatusEnum;
  stepName: string;
  step: number;
  rejectionReason: string;

  // Timestamps
  createdOn: string;
  submissionDate: string;
  approvedDate: string;

  // Municipality Information
  municipalityId: number;
  municipalityName: string;
  nationalId: string;
  applicationDate: string;

  // Funeral Parlour Information
  funeralParlourId: number;
  funeralParlourName: string;
  funeralParlourBusinessRegistration: string;
  funeralParlourContactPhone: string;
  funeralParlourContactEmail: string;
  funeralParlourAddress: string;

  // Deceased Information
  deceased: Deceased;
  deceasedName: string;

  // Next of Kin Information
  nextOfKins: NextOfKin[];

  // Cremation Slot Information
  cremationSlot: CremationSlot;
  crematoriumId: number;
  crematoriumName: string;
  cremationDate: string;

  // Documents
  doctorLetter: Document;
  deathCertificate: Document;
  summaryDocument: Document;
  allDocuments: Document[];

  // Financial Information
  cremationTariffs: CremationTariff[];
  totalAmount: number;

  // Audit Trail
  createdById: number;
  createdByName: string;
  submittedById: number;
  submittedByName: string;
  approvedById: number;
  approvedByName: string;
  completedById: number;
  completedByName: string;
  cancelledById: number;
  cancelledByName: string;

  // Correction History
  correctionHistory: CorrectionRecord[];
  correctionComments: string;
  sentForCorrectionDate: string;
  sentForCorrectionBy: string;
}

export interface CorrectionRecord {
  sentBackByName: string;
  sentBackDate: string;
  comments: string;
}
