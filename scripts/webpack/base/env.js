const envSplitCode = '--';
const defaultParams = {
  LOG: false, // 可以配置日志的显示与否
  
};
const dealArgv = () => {
  let argv = [...process.argv];
  argv.splice(0, 2);
  let result = {};
  argv.forEach((item) => {
    let keyValue = item.trim().split('=');
    let key = keyValue[0];
    let value = keyValue[1];
    if (!key || key.indexOf(envSplitCode) < 0) {
      return;
    }
    key = key.replace(envSplitCode, '');
    if (value) {
      result[key] = value;
    }
  });
  return result;
};

const generateDefine = (params) => {
  let defaultParams = {
    LOG: !!params.log, // 可以配置日志的显示与否
    IS_EXT: !!params.ext || process.env.IS_EXT, // 是否是调试插件环境
  };
  let result = {};
  Object.keys(defaultParams).forEach((key) => {
    let value = defaultParams[key];
    result[key] = value;
  });
  return result;
};

let dealedArgv = dealArgv();
const injectedParams = generateDefine(dealedArgv);
console.log(injectedParams);
module.exports = {
  injectedParams,
};
