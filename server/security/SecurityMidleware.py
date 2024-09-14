from fastapi import Request


class Security:
    def __init__(self) -> None:
        pass
    

    async def __call__(self, request: Request):
        if request.auth:
            return