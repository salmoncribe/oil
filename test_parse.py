import ast
try:
    with open('js/chatbot.js', 'r') as f:
        print(f.read().find("\\`"))
except Exception as e:
    print(e)
