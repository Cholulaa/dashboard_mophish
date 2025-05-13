from fastapi import APIRouter
from models.schemas import Email
from services.db import get_emails, add_emails, clear_emails

router = APIRouter()

@router.get("/emails")
def list_emails():
    return get_emails()

@router.post("/emails/import")
def import_emails(new_emails: list[Email]):
    add_emails(new_emails)
    return {"success": True, "message": "Emails importés"}

@router.delete("/emails")
def delete_all_emails():
    clear_emails()
    return {"success": True, "message": "Tous les emails supprimés"}
