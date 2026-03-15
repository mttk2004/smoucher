import re

with open("app/routes/home.tsx", "r") as f:
    content = f.read()

# Just verifying we can read it
print("Read home.tsx successfully")
