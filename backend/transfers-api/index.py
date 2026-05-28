import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = "t_p20768741_bank_ari4_1"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """API для переводов: поиск получателя и отправка перевода."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    # GET ?action=lookup&phone=... — поиск пользователя по номеру
    if method == "GET" and params.get("action") == "lookup":
        phone = "+" + (params.get("phone") or "").strip().replace(" ", "").replace("-", "").replace("+", "")
        if not phone:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Укажите номер телефона"})}

        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            f"SELECT id, name, phone FROM {SCHEMA}.users WHERE REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), '(', '') = REPLACE(REPLACE(REPLACE(%s, ' ', ''), '-', ''), '(', '')",
            (phone,)
        )
        user = cur.fetchone()
        conn.close()

        if not user:
            return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Пользователь не найден"})}

        return {"statusCode": 200, "headers": cors, "body": json.dumps({"user": dict(user)})}

    # POST / — выполнить перевод
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        from_phone = body.get("from_phone", "+79991234567")
        to_phone = (body.get("to_phone") or "").strip().replace(" ", "").replace("-", "")
        amount = float(body.get("amount") or 0)
        comment = body.get("comment", "")

        if not to_phone or amount <= 0:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Укажите получателя и сумму"})}

        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # Проверяем отправителя
        cur.execute(
            f"SELECT id, name, balance FROM {SCHEMA}.users WHERE REPLACE(REPLACE(phone, ' ', ''), '-', '') = %s",
            (from_phone.replace(" ", "").replace("-", ""),)
        )
        sender = cur.fetchone()
        if not sender:
            conn.close()
            return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Отправитель не найден"})}

        if float(sender["balance"]) < amount:
            conn.close()
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Недостаточно средств на счёте"})}

        # Проверяем получателя
        cur.execute(
            f"SELECT id, name FROM {SCHEMA}.users WHERE REPLACE(REPLACE(phone, ' ', ''), '-', '') = %s",
            (to_phone,)
        )
        recipient = cur.fetchone()
        if not recipient:
            conn.close()
            return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Получатель не найден в системе"})}

        # Проводим перевод
        cur.execute(
            f"UPDATE {SCHEMA}.users SET balance = balance - %s WHERE id = %s",
            (amount, sender["id"])
        )
        cur.execute(
            f"UPDATE {SCHEMA}.users SET balance = balance + %s WHERE id = %s",
            (amount, recipient["id"])
        )
        cur.execute(
            f"INSERT INTO {SCHEMA}.transfers (from_phone, to_phone, amount, comment) VALUES (%s, %s, %s, %s) RETURNING id",
            (from_phone, body.get("to_phone"), amount, comment)
        )
        transfer_id = cur.fetchone()["id"]
        conn.commit()
        conn.close()

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({
                "success": True,
                "transfer_id": transfer_id,
                "message": f"Перевод {amount} ₽ для {recipient['name']} выполнен"
            })
        }

    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}