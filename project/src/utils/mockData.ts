import { Email, Credential, PhishingTemplate, Stats } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Generate a random date within the last 7 days
const getRandomRecentDate = (): string => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7);
  const hoursAgo = Math.floor(Math.random() * 24);
  const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000));
  return date.toISOString();
};

// Generate a phishing link with company name
const generatePhishingLink = (email: string): string => {
  const domain = email.split('@')[1];
  const hash = uuidv4().substring(0, 8);
  return `https://secure-${domain.replace('.', '-')}.${hash}.securityaware.net/login`;
};

// Mock emails data
export const mockEmails: Email[] = [
  {
    id: uuidv4(),
    address: 'john.doe@company.com',
    phishingLink: 'https://secure-company-com.a1b2c3d4.securityaware.net/login',
    clicked: true,
    clickedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    address: 'sarah.smith@tech-corp.com',
    phishingLink: 'https://secure-tech--corp-com.e5f6g7h8.securityaware.net/login',
    clicked: true,
    clickedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    address: 'michael.brown@enterprise.org',
    phishingLink: 'https://secure-enterprise-org.i9j0k1l2.securityaware.net/login',
    clicked: false,
    clickedAt: null,
  },
  {
    id: uuidv4(),
    address: 'lisa.taylor@startup.io',
    phishingLink: 'https://secure-startup-io.m3n4o5p6.securityaware.net/login',
    clicked: false,
    clickedAt: null,
  },
  {
    id: uuidv4(),
    address: 'david.wilson@bigcorp.net',
    phishingLink: 'https://secure-bigcorp-net.q7r8s9t0.securityaware.net/login',
    clicked: true,
    clickedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    address: 'emily.jones@datatech.com',
    phishingLink: 'https://secure-datatech-com.u1v2w3x4.securityaware.net/login',
    clicked: false,
    clickedAt: null,
  },
  {
    id: uuidv4(),
    address: 'robert.miller@finance.co',
    phishingLink: 'https://secure-finance-co.y5z6a7b8.securityaware.net/login',
    clicked: true,
    clickedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    address: 'jessica.white@healthcare.org',
    phishingLink: 'https://secure-healthcare-org.c9d0e1f2.securityaware.net/login',
    clicked: false,
    clickedAt: null,
  },
];

// Mock credentials data
export const mockCredentials: Credential[] = [
  {
    id: uuidv4(),
    email: 'john.doe@company.com',
    username: 'john.doe',
    password: '********',
    capturedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    email: 'sarah.smith@tech-corp.com',
    username: 'ssmith',
    password: '********',
    capturedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    email: 'david.wilson@bigcorp.net',
    username: 'dwilson',
    password: '********',
    capturedAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    email: 'robert.miller@finance.co',
    username: 'rmiller',
    password: '********',
    capturedAt: getRandomRecentDate(),
  },
];

// Mock phishing templates
export const mockTemplates: PhishingTemplate[] = [
  {
    id: uuidv4(),
    name: 'Microsoft 365 Login',
    description: 'Simulated Microsoft 365 login page with company branding',
    previewUrl: '/templates/microsoft',
    createdAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    name: 'Google Workspace',
    description: 'Google Workspace login page with SSO integration',
    previewUrl: '/templates/google',
    createdAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    name: 'Dropbox File Share',
    description: 'Simulated Dropbox file sharing notification and login',
    previewUrl: '/templates/dropbox',
    createdAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    name: 'Slack Urgent Notification',
    description: 'Slack workspace urgent notification requiring login',
    previewUrl: '/templates/slack',
    createdAt: getRandomRecentDate(),
  },
  {
    id: uuidv4(),
    name: 'VPN Access Portal',
    description: 'Corporate VPN access portal requiring authentication',
    previewUrl: '/templates/vpn',
    createdAt: getRandomRecentDate(),
  },
];

// Mock statistics
export const mockStats: Stats = {
  totalEmails: mockEmails.length,
  totalClicks: mockEmails.filter(email => email.clicked).length,
  clickRate: (mockEmails.filter(email => email.clicked).length / mockEmails.length) * 100,
  totalCredentialsCaptured: mockCredentials.length,
};

// Generate mock data for a new email
export const generateMockEmail = (email: string): Email => {
  return {
    id: uuidv4(),
    address: email,
    phishingLink: generatePhishingLink(email),
    clicked: false,
    clickedAt: null,
  };
};