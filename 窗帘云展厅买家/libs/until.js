module.exports = {
    isPoneAvailable: function(t) {
        return !!/^[1][3,4,5,7,8][0-9]{9}$/.test(t);
    },
    isPhoneLength: function(t) {
        return !!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(t);
    }
};