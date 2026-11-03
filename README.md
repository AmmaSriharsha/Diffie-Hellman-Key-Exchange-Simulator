# Diffie–Hellman Key Exchange Simulator

An interactive, browser-based demonstration of how Alice and Bob can establish a shared secret over a public communication channel.

## Objective
To demonstrate how two parties establish a shared secret over a public communication channel without transmitting their private keys.

## Features
- Editable public parameters: prime number `p` and generator `g`
- Separate private keys for Alice and Bob
- Calculates and displays both public keys
- Visualizes the public-key exchange
- Calculates both shared secrets using fast modular exponentiation
- Uses JavaScript `BigInt` for accurate integer arithmetic
- Responsive interface for desktop and mobile

## Run the project
No installation or server is required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`, or open it with Visual Studio Code and use the Live Server extension.

## Default demonstration
- Prime `p = 23`
- Generator `g = 5`
- Alice's private key `a = 6`
- Bob's private key `b = 15`
- Alice's public key `A = 5^6 mod 23 = 8`
- Bob's public key `B = 5^15 mod 23 = 19`
- Alice's shared secret `K = 19^6 mod 23 = 2`
- Bob's shared secret `K = 8^15 mod 23 = 2`

Both participants calculate the same shared secret: **2**.

## How it works
1. Alice and Bob agree publicly on `p` and `g`.
2. Alice chooses private value `a`; Bob chooses private value `b`.
3. Alice calculates `A = g^a mod p`; Bob calculates `B = g^b mod p`.
4. They exchange only `A` and `B` over the public channel.
5. Alice calculates `K = B^a mod p`; Bob calculates `K = A^b mod p`.
6. Both obtain `g^(ab) mod p`, so their shared secrets match.

## Technologies
- HTML5
- CSS3
- JavaScript (ES2020 BigInt)

## Important security note
This is an educational simulator, not production cryptography. It uses small demonstration values and does not implement authentication. Real Diffie–Hellman requires carefully selected parameters and authentication to protect against man-in-the-middle attacks.

## Project structure
```text
Diffie-Hellman-Key-Exchange-Simulator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Author
Add your name here.
