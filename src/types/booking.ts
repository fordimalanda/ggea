export const bookingStatuses = [
  "en_attente",
  "confirmee",
  "refusee",
  "terminee",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export interface Booking {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  car_model: string;
  adresse: string;
  preferred_date: string;
  notes: string | null;
  status: BookingStatus;
}
