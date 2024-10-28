import os

# Generate a random secret key
secret_key = os.urandom(24)  # Generates a 24-byte random key
print(secret_key.hex())  # Print the key in hexadecimal format
