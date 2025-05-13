from pydantic import BaseModel

class CampaignCreate(BaseModel):
    name: str
    status: str
    created_by: str
