import uvicorn
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
import sqlite3
from secrets import token_hex

app = FastAPI()


@app.post('/registration')
def post(data=Body()):
    username = data['username']
    password = data['password']
    TOKEN = str(token_hex(32))
    print(TOKEN)
    connection = sqlite3.connect('database1.db')
    cursor = connection.cursor()
    try:
        # Вставка данных в базу
        cursor.execute('INSERT INTO Users(username, password, TOKEN) VALUES(?, ?, ?);', (username, password, TOKEN))
        connection.commit()  # Подтверждение изменений
    except Exception as e:
        return JSONResponse({'error': str(e)}, status_code=500)
    finally:
        cursor.close()  # Закрытие курсора
        connection.close()  # Закрытие соединения

    return JSONResponse({'TOKEN': TOKEN}, status_code=200)




uvicorn.run(app,port=8001)
