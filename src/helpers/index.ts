const getDurationsNumber = (val: string) => {
    const tempStr = val.replace('ms', '');
    return +tempStr;
};

export {
    getDurationsNumber,
}