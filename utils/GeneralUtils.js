const GeneralUtils = (() => {
    const isArrayEmpty = (data) => {
        const ifArray = Array.isArray(data);
        return ifArray && data.length > 0;
    }

    return {
        isArrayEmpty
    }
})();

export {GeneralUtils};
