from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from server.service.Logger import logger
from server.service.RateLimit import Limiter

app = FastAPI(docs_url=None, dependencies=[Depends(Limiter(rate=100, per=60))])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.mount("/assets", StaticFiles(directory=r"dist/assets", html=True), name="assets")


@app.get("/api")
def read_root():
    return {"message": "Hello World"}


@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    try:
        return FileResponse(r"dist/index.html")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.exception_handler(500)
async def http_exception_handler(request: Request, exc: Exception):
    return RedirectResponse(url="/error")


@app.get("/error")
async def error_page():
    return FileResponse(r"dist/index.html")


@app.middleware("http")
async def catch_invalid_requests(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logger.warning(
            f"WARNING: Invalid HTTP request received. Error: {str(e)}")
        return RedirectResponse(url="/error")

if __name__ == "__main__":
    import uvicorn
    from pyngrok import ngrok

    # Open a ngrok tunnel to the HTTP server
    public_url = ngrok.connect(8000).public_url
    print(f"ngrok tunnel \"{public_url}\" -> \"http://127.0.0.1:8000\"")

    # Update any base URLs or webhooks to use the public ngrok URL
    app.base_url = public_url

    # Extract the hostname from the public_url
    from urllib.parse import urlparse
    hostname = urlparse(public_url).hostname

    # Add the ngrok hostname to the allowed hosts
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1", hostname])

    # Start the uvicorn server
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
