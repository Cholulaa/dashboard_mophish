import os
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

def login(data: dict, request: Request):
    if data.get("username") == os.getenv("ADMIN_USER") and data.get("password") == os.getenv("ADMIN_PASS"):
        request.session["is_admin"] = True
        return { "success": True, "message": "Connexion réussie ✅" }
    raise HTTPException(status_code=401, detail="Identifiants incorrects ❌")

def check_auth(request: Request):
    if request.session.get("is_admin"):
        return { "authenticated": True }
    raise HTTPException(status_code=401, detail="Non authentifié")

def logout(request: Request):
    request.session.clear()
    return { "success": True, "message": "Déconnexion réussie ✅" }
