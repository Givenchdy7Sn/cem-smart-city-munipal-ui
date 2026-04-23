import { CremationSlotEnum } from '../core/enums/cremation-slot.enum';

export interface CremationSlot {
  id: number;
  name: string;
  crematoriumId: number;
  cremationBookingId: number;
  cremationSlotEnum: CremationSlotEnum;
  slotTime: string;
  slotDate: string;
}
