export interface Email {
  id: string;
  address: string;
  phishingLink: string;
  clicked: boolean;
  clickedAt: string | null;
}

export interface Credential {
  id: string;
  email: string;
  username: string;
  capturedAt: string;
}

export interface PhishingTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  createdAt: string;
}

export interface Stats {
  totalEmails: number;
  totalClicks: number;
  clickRate: number;
  totalCredentialsCaptured: number;
}