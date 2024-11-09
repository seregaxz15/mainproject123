import uvicorn
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
import sqlite3
from secrets import token_hex
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post('/registration')
def post(data=Body()):
    username = data['username']
    password = data['password']
    TOKEN = str(token_hex(32))
    print(TOKEN)
    connection = sqlite3.connect('my_database.db')
    cursor = connection.cursor()
    try:
        cursor.execute('INSERT INTO Users(username, password, TOKEN) VALUES(?, ?, ?);',
                       (username, password, TOKEN))
        connection.commit()
    except Exception as e:
        return JSONResponse({'error': str(e)}, status_code=500)
    finally:
        cursor.close()
        connection.close()

    return JSONResponse({'TOKEN': TOKEN}, status_code=200)

@app.post('/authorization')
def post(data=Body()):
    username = data['username']
    password = data['password']
    connection = sqlite3.connect('my_database.db')
    cursor = connection.cursor()
    cursor.execute(('''SELECT password FROM Users
    WHERE username = '{}';
    ''').format(username))

    pas = cursor.fetchall()
    if pas[0][0] != password:

        return JSONResponse({'error': 'wrong_password'}, status_code=404)
    else:
        cursor.execute(('''SELECT TOKEN FROM Users
                            WHERE username = '{}';
                            ''').format(username))
        TOKEN = cursor.fetchone()
        return JSONResponse({'TOKEN':TOKEN[0]}, status_code=200)
@app.post('/list')
def list(data=Body()):
    TOKEN = data['TOKEN']
    list_name = data['list_name']
    connection = sqlite3.connect('my_database.db')
    cursor = connection.cursor()
    cursor.execute(('''SELECT Users.id FROM Users WHERE TOKEN ='{}';''').format(TOKEN))
    id = cursor.fetchone()
    cursor.execute('INSERT INTO List(owner, list_name) VALUES(?, ?);',
                       (str(id[0]), list_name))




    cursor.close()
    connection.commit()
    connection.close()
    return JSONResponse({'TOKEN': id[0]}, status_code=200)
uvicorn.run(app,port=8001)
