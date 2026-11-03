const $ = (id) => document.getElementById(id);

function modPow(base, exponent, modulus) {
  // Fast modular exponentiation using BigInt to avoid JavaScript number overflow.
  let result = 1n;
  base %= modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent /= 2n;
    base = (base * base) % modulus;
  }
  return result;
}

function readPositiveInteger(id, label) {
  const value = $(id).value.trim();
  if (!/^[0-9]+$/.test(value) || BigInt(value) <= 0n) {
    throw new Error(`${label} must be a positive whole number.`);
  }
  return BigInt(value);
}

function calculate() {
  try {
    const p = readPositiveInteger("prime", "Prime p");
    const g = readPositiveInteger("generator", "Generator g");
    const a = readPositiveInteger("alicePrivate", "Alice's private key");
    const b = readPositiveInteger("bobPrivate", "Bob's private key");

    if (p <= 2n) throw new Error("Choose a prime p greater than 2.");
    if (g >= p || g <= 1n) throw new Error("Generator g must be between 2 and p − 1.");
    if (p > 1000000000000000000n) throw new Error("For this browser demo, keep p at or below 10^18.");

    const A = modPow(g, a, p);
    const B = modPow(g, b, p);
    const aliceKey = modPow(B, a, p);
    const bobKey = modPow(A, b, p);

    $("alicePublic").textContent = A.toString();
    $("bobPublic").textContent = B.toString();
    $("alicePacket").textContent = `A = ${A}`;
    $("bobPacket").textContent = `B = ${B}`;
    $("aliceSecret").textContent = aliceKey.toString();
    $("bobSecret").textContent = bobKey.toString();
    $("aliceWork").textContent = `${B}^${a} mod ${p}`;
    $("bobWork").textContent = `${A}^${b} mod ${p}`;

    const matched = aliceKey === bobKey;
    $("success").hidden = !matched;
    $("status").textContent = matched ? "✓ Both participants generated an identical key." : "Keys did not match. Check the inputs.";
    $("status").style.color = matched ? "var(--green)" : "#ff9a9a";
  } catch (error) {
    $("status").textContent = error.message;
    $("status").style.color = "#ff9a9a";
    $("success").hidden = true;
  }
}

$("calculateBtn").addEventListener("click", calculate);
$("resetBtn").addEventListener("click", () => {
  $("prime").value = 23;
  $("generator").value = 5;
  $("alicePrivate").value = 6;
  $("bobPrivate").value = 15;
  calculate();
});

calculate();
