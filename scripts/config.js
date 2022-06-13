function greatrc(define) {
  return Object.entries(define).reduce(
    (result, [key, value]) => ({ ...result, [key]: JSON.stringify(value) }),
    {}
  );
}
function greatrcProcess(define) {
  return Object.entries(define).reduce(
    (result, [key, value]) => ({
      ...result,
      [`process.env.${key}`]: JSON.stringify(value),
    }),
    {}
  );
}
module.exports = {
  PORT: 8085,
  HOST: '0.0.0.0',
  greatrc,
  greatrcProcess,
};
