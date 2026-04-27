import re

with open('js/chatbot.js', 'r') as f:
    content = f.read()

# Replace \` with `
content = content.replace(r'\`', '`')

# Replace \${ with ${
content = content.replace(r'\${', '${')

with open('js/chatbot.js', 'w') as f:
    f.write(content)

print("Fixed backslashes.")
