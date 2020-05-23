class Log {
  constructor(config, Color) {
    this.config = config;
    this.Color = Color;
    this.defaultColor = this.Color.Colors().FgRed; // Red is choosen for error
  }

  defination(def) {
    if (this.config.constants().log.show) {
      const color = this.Color.Init().params(this.Color.Colors().FgMagenta, this.Color.Colors().Bright).make();
      console.log(
        color,
        `[DEFINATION] [${new Date().toDateString()}] - (${def.param}, [${def.data}], [${def.body}], ${def.method})`,
        this.defaultColor
      );
    }
  }

  special(msg) {
    if (this.config.constants().log.show) {
      const color = this.Color.Init().params(this.Color.Colors().FgCyan, this.Color.Colors().Bright).make();
      console.log(color, `[SPECIAL] [${new Date().toDateString()}] - `, msg, this.defaultColor);
    }
  }

  info(msg) {
    if (this.config.constants().log.show) {
      const color = this.Color.Init().params(this.Color.Colors().FgYellow, this.Color.Colors().Bright).make();
      console.log(color, `[INFO] [${new Date().toDateString()}] - `, msg, this.defaultColor);
    }
  }

  error(msg) {
    if (this.config.constants().log.show) {
      const color = this.Color.Init().params(this.Color.Colors().FgRed, this.Color.Colors().Bright).make();
      console.log(color, `[ERROR] [${new Date().toDateString()}] - `, msg, this.defaultColor);
    }
  }
}

module.exports = Log;
