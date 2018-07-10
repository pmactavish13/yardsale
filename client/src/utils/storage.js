export default {

    //*************** STORAGE *************************/
    // Gets key from storage
    getFromStorage: function (key) {
        if (!key) {
            return null;
        }

        try {
            const valueStr = localStorage.getItem(key);
            if (valueStr) {

                return JSON.parse(valueStr);
            }
            return null;

        } catch (err) {
            return null;
        }
    },

    // Sets key in storage
    setInStorage: function (key, obj) {
        if (!key) {
            console.log('Error: Key is missing');
        }
        try {
            localStorage.setItem(key, JSON.stringify(obj));

        } catch (err) {
            console.log(err);
        }
    },

    // Removes key from storage
    removeFromStorage: function (key) {
        if (!key) {
            console.log('Error: Key is missing');
        }

        try {
            console.log(key)
            // localStorage.removeItem(key);
            localStorage.clear();
            return null;
        } catch (err) {
            console.log(err);
        }
    }
};