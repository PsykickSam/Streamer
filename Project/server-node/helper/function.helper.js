class FunctionHelper {
  constructor(config, path) {
    this.config = config;
    this.path = path;
  }

  // Bind path with target
  path_binder(str, target) {
    const sroot = this.config.file().locations.root;
    const schild = this.config.file().locations.child;

    if (schild.hasOwnProperty(str) === false) {
      return "";
    }

    const storage = sroot.storage.source(true);
    const source = schild[str].source;
    const bind = this.b2fs_converter(this.path.join(this.config.directory().root, storage, source, target, "/"));

    return bind;
  }

  // Path to Link converter
  p2l_converter(link, path) {
    if (!path) return null;

    // Path to Link converter
    const sroot = this.config.file().locations.root;
    const storage = sroot.storage.source(false);
    const actualPath = [];
    const splitPath = path.split("/");

    splitPath.forEach((split) => {
      if (storage === split || actualPath.length !== 0) {
        actualPath.push(split);
      }
    });

    return link + actualPath.join("/");
  }

  // Backward to Forward slash converter
  b2fs_converter(path) {
    if (path.includes("\\")) {
      const path_array = path.split("\\");
      return path_array.join("/");
    }

    return path;
  }

  // Directory name generator
  dirn_generator(str) {
    const divider = "__";
    const charnumStr = str.replace(/[^a-zA-Z0-9]/g, "");
    const updateCase = charnumStr.toUpperCase();
    const generate = updateCase + divider + Date.now();
    return generate;
  }

  // Temp name generator
  tempn_generator(str, channel = "Channel") {
    const temp_divider = "___temp__";
    const temp_fix = `${temp_divider}${channel}`; // TODO: Add username and update

    return {
      encode: () => {
        return `${str}${temp_fix}`;
      },
      decode: () => {
        return str.substr(0, str.length - (str.length - str.lastIndexOf(temp_divider)));
      },
    };
  }

  // API structure generator
  api() {
    return {
      error: false,
      status: { FAILED: "Failed", PASSED: "Passed", UNKNOWN: "Unknown" },
      code: { c200: 200, c500: 500, c404: 404, c400: 400 },
      generate: (data, message, error = false, status = "Passed", code = 200) => {
        return { code, status, error, message, data };
      },
    };
  }
}

module.exports = (config, path) => new FunctionHelper(config, path);
