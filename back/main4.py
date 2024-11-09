from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
import sqlite3
import jwt
import sqlite3
import datetime
from fastapi import FastAPI, Request, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from pydantic import BaseModel

app = FastAPI()



@app.post('/post')
def post(data=Body()):
    username = data['username']
    password = data['password']
    token = data['TOKEN']
    connection = sqlite3.connect('my_database.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Users(username, password, TOKEN) VALUES(?, ?, ?);',
                   (username, password, token))
    cursor.close()
    connection.commit()


    return JSONResponse({'message': 'everything'}, status_code=200)
