from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Email(BaseModel):
    address: str
    phishing_link: str
    clicked: bool = False
    clicked_at: Optional[str] = None

class Credential(BaseModel):
    email: str
    username: str
    captured_at: datetime
