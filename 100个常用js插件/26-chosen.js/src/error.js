module.exports = (condition, text) => {
    if(condition) throw new TypeError(text);
}