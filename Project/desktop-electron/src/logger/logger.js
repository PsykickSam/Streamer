module.exports = {
  info: (msg) => {
    console.log(`[INFO] [${Date.now()}] ${msg}`);
  },
  error: (msg, err = null) => {
    console.log(`[ERROR] [${Date.now()}] ${msg}`);
    if (err) {
      console.log(`[ERROR-MESSAGE]\n${err}\n[ERROR-MESSAGE]`);
    }
  },
  test: (msg) => {
    console.log(`[TEST] [${Date.now()}] ${msg}`);
  },
};
