// BOOKINGS
export interface Amenity {
  image_url: string;
  business_guid: string;
  description: string;
}

export interface RuleProps {
  rule_id: number;
  activity_id: number;
  values_to_assign: [
    {
      rule_value_id: number | null | undefined;
      value: 'string';
    },
  ];
}

export interface AgendaAvailability {
  agenda_id: number;
  from: string;
  to: string;
  available_places: number;
  appointment_duration: string;
  repetition_days: Array<number>;
}

export interface UpdatedAgendaAvailability {
  start_date: number;
  from: string;
  to: string;
  available_places: number;
  appointment_duration: string;
  repetition_days: Array<number>;
}

export interface ScheduleListProps {
  activityId: number;
  agendaId: number;
  date: number;
}

// MASTER
export type CategoryTranslation = Array<{
  name: string;
  language_id: number;
}>;

// PADRON
export interface FindResidentProps {
  countryCode: string;
  areaCode: string;
  number: string;
}

export interface CreateResidentProps {
  id?: number;
  name: string;
  surname: string;
  country_code: string;
  area_code: string;
  phone_number: string;
  from: string;
  to: string;
  email: string;
  property_ids?: Array<number>;
}

export interface PersonProps {
  name: string;
  surname: string;
  country_code: string;
  area_code: string;
  phone_number: string;
  from: string;
  to: Date;
  email: Date;
  property_code: string;
}

export interface UpdateValues {
  from: number;
  property_code: string;
  to: number;
}

// SUPPORT
export type NewIssue = {
  title: string;
  message: {
    text: string;
    image_url: string;
  };
};

export type NewMessage = {
  text: string;
  image_url: string | null;
};
