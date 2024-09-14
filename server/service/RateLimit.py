from collections import deque
from datetime import datetime

from fastapi import HTTPException, Request
from .Logger import logger


class Limiter:
    def __init__(self, rate: int, per: int) -> None:
        self.rate = rate
        self.per = per
        self.clients: dict[str, deque[float]] = {}

    async def __call__(self, request: Request):
        client_ip = request.client.host  # type: ignore
        if not self.is_allowed(client_ip):
            raise HTTPException(status_code=429, detail="Too many requests")

    def is_allowed(self, client_id: str) -> bool:
        now = datetime.now().timestamp()
        if client_id not in self.clients:
            self.clients[client_id] = deque()

        # Remove expired timestamps
        while self.clients[client_id] and now - self.clients[client_id][0] > self.per:
            self.clients[client_id].popleft()

        if len(self.clients[client_id]) >= self.rate:
            logger.warn(f"[{client_id}] sent too many requests!")
            return False

        self.clients[client_id].append(now)
        return True
