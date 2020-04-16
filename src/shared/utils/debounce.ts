export default (func: Function, delay: number) => {
  let timeout;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};
