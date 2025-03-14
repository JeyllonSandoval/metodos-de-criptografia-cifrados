import socket

def custom_encrypt(text, key):
    encrypted = []
    key_len = len(key)
    for i, char in enumerate(text):
        shift = ord(key[i % key_len])
        encrypted_char = chr((ord(char) + shift) % 256)
        encrypted.append(encrypted_char)
    return ''.join(encrypted)

def custom_decrypt(text, key):
    decrypted = []
    key_len = len(key)
    for i, char in enumerate(text):
        shift = ord(key[i % key_len])
        decrypted_char = chr((ord(char) - shift) % 256)
        decrypted.append(decrypted_char)
    return ''.join(decrypted)


design = "El algoritmo utiliza un cifrado por desplazamiento combinado, donde cada carácter del mensaje es desplazado según el valor ASCII del carácter de la clave correspondiente. Si el valor excede 256, se utiliza el módulo para mantener el rango."
with open('encryption_design.txt', 'w') as file:
    file.write(design)

print("Escribe el mensaje (mínimo 2 párrafos de 5 líneas cada uno):")
message = ""
for _ in range(11): 
    line = input()
    message += line + '\n'

key = input("Ingrese una clave de al menos 8 bytes: ")
while len(key) < 8:
    print("La clave debe tener al menos 8 bytes.")
    key = input("Ingrese una clave válida: ")

encrypted_message = custom_encrypt(message, key)
print("Mensaje encriptado:")
print(encrypted_message)

def send_message(host, port, message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        s.sendall(message.encode())
        print("Mensaje enviado.")

def receive_message(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", port))
        s.listen()
        conn, addr = s.accept()
        with conn:
            print(f"Conectado por {addr}")
            data = conn.recv(1024).decode()
            print("Mensaje recibido:")
            print(data)
            decrypted_message = custom_decrypt(data, key)
            print("Mensaje desencriptado:")
            print(decrypted_message)

enviar = input("¿Desea enviar el mensaje a otro nodo? (s/n): ")
if enviar.lower() == "s":
    host = input("Ingrese la IP del nodo receptor: ")
    port = int(input("Ingrese el puerto de transmisión: "))
    send_message(host, port, encrypted_message)
else:
    puerto = int(input("Ingrese el puerto para recibir el mensaje: "))
    receive_message(puerto)
