# Function to encrypt the text using XOR with a key
def custom_encrypt(text: str, key: str) -> str:
    # Performs XOR between each character of the text and the key (cyclically)
    encrypted = ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))
    # Converts each encrypted character to its 2-digit hexadecimal representation
    return ''.join(f'{ord(c):02x}' for c in encrypted)

# Function to decrypt the text using the same key
def custom_decrypt(encrypted_text: str, key: str) -> str:
    # Converts the hexadecimal text back to characters
    decrypted = ''.join(chr(int(encrypted_text[i:i+2], 16)) for i in range(0, len(encrypted_text), 2))
    # Performs XOR again to recover the original text
    return ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(decrypted))

def main():
    # Requests and validates the key (minimum 8 characters)
    while True:
        key = input("Input your key: ")
        if len(key) >= 8:
            break
        print("The key must have at least 8 characters.")
    
    # Requests the text to encrypt (2 paragraphs of 5 lines each)
    print("\nEnter the text line by line:")
    paragraphs = []
    for i in range(2):
        print(f"Paragraph {i+1}:")
        # Collects 5 lines of text for each paragraph
        paragraph = '\n'.join([input(f"Line {j+1}: ") for j in range(5)])
        paragraphs.append(paragraph)
    
    # Joins the paragraphs with a double line break
    text = '\n\n'.join(paragraphs)
    # Encrypts the entire text
    encrypted_text = custom_encrypt(text, key)
    
    # Shows the encrypted text
    print("\nText encrypted:")
    print(encrypted_text)
    
    # Requests the key again to verify and decrypt
    while True:
        key_verify = input("\nInput your key again to decrypt: ")
        if key_verify == key:
            break
        print("Incorrect key, try again.")
    
    # Decrypts and shows the original text
    decrypted_text = custom_decrypt(encrypted_text, key)
    print("\nDecrypted text:")
    print(decrypted_text)

# Entry point of the program
if __name__ == "__main__":
    main()
