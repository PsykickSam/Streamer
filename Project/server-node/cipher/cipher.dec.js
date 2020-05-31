const { config, crypto } = require("../required");

const decrypt = (text) => {
  const textParts = text.split("-");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(config.secret().cipher_key), iv);
  const update = decipher.update(encryptedText);
  const decrypted = Buffer.concat([update, decipher.final()]);
  return decrypted.toString();
};

module.exports = decrypt;
