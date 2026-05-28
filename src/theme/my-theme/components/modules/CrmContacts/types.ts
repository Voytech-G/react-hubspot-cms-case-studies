export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
};

export type ApiResponse = {
  contacts?: Contact[];
  error?: string;
  detail?: string;
};
