# main.py  ────────────────────────────────────────────────
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import os

# ‑‑‑ Import des routeurs internes
from routes import auth   # routes/auth.py doit exister

app = FastAPI(
    title="MoPhish API",
    version="1.0.0"
)

# ─────────────────────────────────────────────────────────
# CORS (frontend React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # change si besoin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cookie‑session
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "moPhishSecret"),
    session_cookie="session",       # nom du cookie
    https_only=False                # passe à True si tu forçes https
)

# ─────────────────────────────────────────────────────────
# Endpoints simples
@app.get("/api/ping")
def ping():
    """Health‑check."""
    return {"message": "Backend FastAPI OK ✅"}

# ─────────────────────────────────────────────────────────
# Montage des routeurs
app.include_router(auth.router, prefix="/api")

# ─────────────────────────────────────────────────────────
# Optionnel : run direct en dev
if __name__ == "__main__":        # python main.py
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=4000,
        reload=True
    )
