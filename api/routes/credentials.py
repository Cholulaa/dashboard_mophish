from fastapi import APIRouter
from models.schemas import Credential
from services.db import get_credentials, add_credential, clear_credentials

router = APIRouter()

@router.get("/credentials")
def list_credentials():
    return get_credentials()

@router.post("/credentials")
def capture_credential(cred: Credential):
    add_credential(cred)
    return {"success": True, "message": "Identifiant enregistré"}

@router.delete("/credentials")
def clear_all_credentials():
    clear_credentials()
    return {"success": True, "message": "Tous les identifiants supprimés"}
