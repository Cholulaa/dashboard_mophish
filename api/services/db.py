emails = []
credentials = []

def get_emails():
    return emails

def get_credentials():
    return credentials

def add_emails(new_emails):
    emails.extend(new_emails)

def clear_emails():
    emails.clear()

def add_credential(cred):
    credentials.append(cred)

def clear_credentials():
    credentials.clear()
