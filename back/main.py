import uvicorn
from fastapi import FastAPI, Body, Request
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse
import sqlite3
from secrets import token_hex
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/registration')
async def post(data=Body()):
    username = data['user_email']
    password = data['password']
    TOKEN = str(token_hex(32))
    print(TOKEN)
    connection = sqlite3.connect('mainproject123/back/my_database.db')
    cursor = connection.cursor()

    cursor.execute(('''SELECT * FROM Users
    WHERE username = '{}';
    ''').format(username))

    user_email = cursor.fetchone()
    if user_email is None:
        try:
            cursor.execute('INSERT INTO Users(username, password, TOKEN) VALUES(?, ?, ?);',
                        (username, password, TOKEN))
            connection.commit()
        except Exception as e:
            return JSONResponse({'error': str(e)}, status_code=500)
    

        return JSONResponse({'TOKEN': TOKEN}, status_code=200)

        
    else:
        return JSONResponse({'error': 'there_is_such_a_login'}, status_code=400)



@app.post('/authorization')
async def post(data=Body()):
    username = data['user_email']
    password = data['password']
    connection = sqlite3.connect('mainproject123/back/my_database.db')
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
async def list(request: Request):
    data = await request.json()
    TOKEN = data.get("token")
    list_name = data.get("name")
    items = data.get("items")
    done=True
    connection = sqlite3.connect('mainproject123/back/my_database.db')
    cursor = connection.cursor()

    cursor.execute(('''SELECT Users.id FROM Users WHERE TOKEN ='{}';''').format(TOKEN))
    id_user = cursor.fetchone()
    cursor.execute('INSERT INTO List(owner, list_name) VALUES(?, ?);',
                       (str(id_user[0]), list_name))

    id_list = cursor.lastrowid

    for item in items:
        username = item.get("user_email")
        sm = item.get("sum")
        description = item.get("name")

        cursor.execute(('''SELECT Users.id FROM Users WHERE username ='{}';''').format(username))
        id_user_creditor = cursor.fetchone()

        cursor.execute('INSERT INTO Dolg(id_user, id_list, list_name, sum, description, done) VALUES(?, ?, ?, ?, ?, ?);',
                       (str(id_user_creditor[0]), id_list, list_name, sm, description, done))

    #cursor.close()
    connection.commit()
    #connection.close()
    return JSONResponse({'id': id_list}, status_code=200)
@app.post('/all_lists')
async def all_lists(data=Body()):
    TOKEN = data['token']
    connection = sqlite3.connect('mainproject123/back/my_database.db')
    cursor = connection.cursor()
    cursor.execute(('''SELECT Users.id FROM Users WHERE TOKEN ='{}';''').format(TOKEN))
    id_user = cursor.fetchone()
    user_list = []
    cursor.execute('''
    SELECT List.id, list_name FROM List WHERE owner ='{}';'''.format(id_user[0])
    )
    for _list in cursor.fetchall():
        id, list_name = _list
        items = []
        cursor.execute('''SELECT Dolg.id_user, Users.username, Dolg.sum, Dolg.description, Dolg.done FROM Dolg
         INNER JOIN Users ON Users.id=Dolg.id_user WHERE
        Dolg.id_list = '{}';
        '''.format(id))
        for dolg in cursor.fetchall():
            items.append({'name': dolg[1], 'sum_dolg': dolg[2], 'decription':dolg[3], 'done':dolg[4]})
        user_list.append({'id':id, 'name':list_name, 'items': items})
    return JSONResponse(user_list)

@app.post('/history')
async def history(data=Body()):
    TOKEN = data['token']
    connection = sqlite3.connect('mainproject123/back/my_database.db')
    cursor = connection.cursor()
    cursor.execute(('''SELECT Users.id FROM Users WHERE TOKEN ='{}';''').format(TOKEN))
    id_user = cursor.fetchone()
    user_list = []
    cursor.execute('''
    SELECT List.id, list_name FROM List WHERE owner ='{}';'''.format(id_user[0])
    )
    for _list in cursor.fetchall():
        id, list_name = _list
        items = []
        cursor.execute('''SELECT Dolg.id_user, Users.username, Dolg.sum, Dolg.description, Dolg.done FROM Dolg
         INNER JOIN Users ON Users.id=Dolg.id_user WHERE
        Dolg.id_list = '{}';
        '''.format(id))
        for dolg in cursor.fetchall():
            items.append({'name': dolg[1], 'sum_dolg': dolg[2], 'decription':dolg[3], 'done':dolg[4]})
        user_list.append({'id':id, 'name':list_name, 'items': items})
    return JSONResponse(user_list)

uvicorn.run(app,port=8001)
