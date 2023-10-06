export default class LocalStorage {

    readData($key, $value) {
        const data = JSON.parse(localStorage.getItem($key));
        if (data === null) {
            this.saveData($key, $value);
            return $value;
        }
        return data;
    }
    saveData($key, $value) {
        localStorage.setItem($key, JSON.stringify($value));
    }

}