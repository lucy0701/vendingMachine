export default class LocalStorageController {
    initData($key, $value) {
        const data = JSON.parse(localStorage.getItem($key));

        if (data === null) {
            this.updateData($key,$value);
            return $value;
        };
        return data;
    }
    updateData($key, $value) {
        localStorage.setItem($key, JSON.stringify($value));
    }
}