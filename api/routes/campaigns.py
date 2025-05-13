from fastapi import APIRouter, HTTPException
from uuid import uuid4
from models.campaigns import CampaignCreate
from services.db import get_db

router = APIRouter()

@router.post("/campaigns")
def create_campaign(campaign: CampaignCreate):
    db = get_db()
    try:
        db.execute(
            "INSERT INTO campaigns (id, name, status, created_by) VALUES (%s, %s, %s, %s)",
            (str(uuid4()), campaign.name, campaign.status, campaign.created_by)
        )
        db.commit()
        return { "success": True, "message": "Campagne créée ✅" }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Erreur : {e}")
