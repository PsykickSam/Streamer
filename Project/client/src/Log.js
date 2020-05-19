// Self
import Constants from "./Constants";
import _apidef from "./api/api.defination";

const info = (val) => {
  if (!Constants.Log.logMode) return;

  if (typeof val === "string") {
    console.log(`[INFO] - DEBUG - ${val} - [INFO]`);
    return;
  }

  console.log(`[INFO] - DEBUG\n`, val, `\n[INFO] - DEBUG`);
};

const error = (val) => {
  if (!Constants.Log.logMode) return;

  if (typeof val === "string") {
    console.log(`[ERROR] - DEBUG - ${val} - [ERROR]`);
    return;
  }

  console.log(`[ERROR] - DEBUG\n`, val, `\n[ERROR] - DEBUG`);
};

const warn = (val) => {
  if (!Constants.Log.logMode) return;

  if (typeof val === "string") {
    console.log(`[WARN] - DEBUG - ${val} - [WARN]`);
    return;
  }

  console.log(`[WARN] - DEBUG\n`, val, `\n[WARN] - DEBUG`);
};

const action = (method_name) => {
  if (!Constants.Log.logMode) return;

  console.log(`[ACTION] - DEBUG - METHOD LOADED - ${method_name} - [ACTION]`);
};

const multi = (val, valx) => ({
  Error: () => {
    {
      if (!Constants.Log.logMode) return;

      console.log(`[ERROR] - DEBUG `, val, ` - START`);
      console.log(valx);
      console.log(`[ERROR] - DEBUG - END`);
    }
  },
  Info: () => {
    {
      if (!Constants.Log.logMode) return;

      console.log(`[INFO] - DEBUG `, val, ` - START`);
      console.log(valx);
      console.log(`[INFO] - DEBUG - END`);
    }
  }
});

const defination = {
  def: _apidef,
  show: (val) => {
    if (!Constants.Log.logMode) return;
  
    if (typeof val === "object") {
      console.log(`[DEFINATION] - DEBUG - (${val.param}, [${val.data}], [${val.body}], ${val.method}) - [DEFINATION]`);
    }

    return;
  }
}

const Log = { info, error, warn, action, multi, defination };

export default Log;
