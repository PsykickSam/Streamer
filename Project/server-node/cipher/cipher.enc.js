const { config, crypto } = require("../required");

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // 16 - For AES
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(config.secret().cipher_key), iv);
  const update = cipher.update(text);
  const encrypted = Buffer.concat([update, cipher.final()]);

  return iv.toString("hex") + "-" + encrypted.toString("hex");
};

module.exports = encrypt;
