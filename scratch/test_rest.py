import urllib.request
import json

url = "https://ltipxxsedxjzdmlndqgw.supabase.co/rest/v1/quizzes"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0aXB4eHNlZHhqemRtbG5kcWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwODk3ODAsImV4cCI6MjA4NjY2NTc4MH0.KDia3aMe40m2zHHW3ceTcKo8muLouy_pMvPuQ4WPNec"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal, resolution=merge-duplicates"
}

test_quiz = {
    "id": "fe000000-0000-0000-0000-000000000001",
    "teacher_id": "21feff02-016d-46e2-bb9d-c27495133b1b",
    "title": "REST API Test Quiz",
    "description": "Test quiz description",
    "subject": "Matematika",
    "grade_level": "6. osztály",
    "topic": "Test Topic",
    "questions": [{"id": "q1", "text": "Test question?", "type": "true-false", "options": [{"id": "o1", "text": "Igaz", "isCorrect": True}], "timeLimit": 15}],
    "is_published": True
}

data = json.dumps([test_quiz]).encode("utf-8")
req = urllib.request.Request(url, data=data, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        print("Status code:", resp.status)
        print("Response:", resp.read().decode("utf-8"))
except Exception as e:
    print("Error:", e)
    if hasattr(e, "read"):
        print("Error body:", e.read().decode("utf-8"))
