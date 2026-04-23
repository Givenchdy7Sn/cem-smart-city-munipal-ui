export interface CremationTariff {
  id: number;
  description: string;
  tariff: number;
  saturdayTariff?: number;
  sundayTariff?: number;
  category?: string;
}
