# routes/auth.py
from fastapi import APIRouter, Request, HTTPException
import os

router = APIRouter()

@router.post("/login")
async def login(request: Request):
    body = await request.json()
    if (body.get("username") == os.getenv("ADMIN_USER", "admin") and
        body.get("password") == os.getenv("ADMIN_PASS", "password1")):
        request.session["is_admin"] = True
        return {"success": True, "message": "Connexion réussie ✅"}
    raise HTTPException(status_code=401, detail="Identifiants incorrects")

@router.get("/check-auth")
async def check_auth(request: Request):
    return {"authenticated": bool(request.session.get("is_admin"))}

@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"success": True, "message": "Déconnexion réussie ✅"}
