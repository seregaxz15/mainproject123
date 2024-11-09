from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
import sqlite3

app = FastAPI()

@app.get('/us')
def us():
    connection = sqlite3.connect('my_database.db')
    cursor = connection.cursor()
    cursor.execute('SELECT username FROM Users')
    username_list = []
    for username in cursor.fetchall():
        username_list.append({'id': username[0], 'username': username[1], 'password': username[2], 'TOKEN': username[3]})
    cursor.close()
    connection.commit()
    return JSONResponse(username_list)

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