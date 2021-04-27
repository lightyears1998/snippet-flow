export function base64Encode(text: string): string {
  return Buffer.from(text, "utf8").toString("base64");
}

export function base64Decode(encodedText: string): string {
  return Buffer.from(encodedText, "base64").toString("utf8");
}
