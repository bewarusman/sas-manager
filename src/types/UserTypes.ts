export interface UserType {
  id: number;
  username: string;
  firstname: string | null;
  lastname: string | null;
  city: string | null;
  phone: string | null;
  profile_id: number;
  balance: string;
  loan_balance: string | null;
  expiration: string;
  last_online: string;
  parent_id: number;
  email: string | null;
  static_ip: string | null;
  enabled: number;
  company: string | null;
  notes: string | null;
  simultaneous_sessions: number;
  address: string | null;
  contract_id: string | null;
  created_at: string;
  national_id: string | null;
  mikrotik_ipv6_prefix: string | null;
  group_id: number | null;
  gps_lat: number | null;
  gps_lng: number | null;
  street: string | null;
  n_row: number;
  status: Status;
  online_status: number;
  parent_username: string;
  debt_days: number;
  profile_details: ProfileDetails;
  daily_traffic_details: DailyTrafficDetails;
  group_details: GroupDetails | null;
}

export interface Status {
  status: boolean;
  traffic: boolean;
  expiration: boolean;
  uptime: boolean;
}

export interface ProfileDetails {
  id: number;
  name: string;
  type: number;
}

export interface DailyTrafficDetails {
  user_id: number;
  traffic: number;
}

export interface GroupDetails {
  // Add appropriate fields if needed; it is null in the provided data
}
