import { Gender } from '../core/enums/Gender.enum';
import { NextOfKin } from './next-of-kin.model';

export interface Deceased {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  nationalId: string;
  dateOfBirth: Date;
  dateOfDeath: Date;
  age: number;
  ethnicity: string;
  lastKnownAddress: string;
  placeOfDeath: string;
  causeOfDeath: string;
  methodOfDisposalOfAshes: string;
  coffinLength: number | null;
  coffinWidth: number | null;
  coffinDepth: number | null;
  timeDueAtCremation: string;
  hasPacemaker: boolean;
  deathCertificateNumber: string;
  requireBurial: boolean;
  cemetery: string;
  graveNumber: string;
  section: string;
  dateOfInterment: string;
  timeDueAtCemetery: string;
  burialType: string;
  burialOrderNo: string;
  burialOrderDate: string;
  rightOfBurialFavourOf: string;
  rightOfBurialAddress: string;
  certificateNo: string;
  certificateDate: string;
  nextOfKin1: NextOfKin;
  nextOfKin2: NextOfKin;
}
