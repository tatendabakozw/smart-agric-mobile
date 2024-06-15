// types.ts
export interface State {
  darkMode: boolean;
  hydropinics_user: string | null;
  signed_in: boolean;
  search_query: string;
  current_temp: number;
  current_humid: number;
}

export type Action =
  | { type: "DARK_MODE_ON" }
  | { type: "DARK_MODE_OFF" }
  | { type: "USER_LOGIN"; payload: string }
  | { type: "USER_SIGNED_IN"; payload: boolean }
  | { type: "USER_LOGOUT" }
  | { type: "CHANGE_TEMP"; payload: number }
  | { type: "CHANGE_HUMID"; payload: number }
  | { type: "SET_SEARCH_QUERY"; payload: string };
