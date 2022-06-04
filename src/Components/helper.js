import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './helper.css';

const helper = {

    toastNotification(message, type) {
        toast(message, {
            type: type === 'SUCCESS_MESSAGE' ? "success" : "error",
            autoClose: 4000,
            className:
                type === 'SUCCESS_MESSAGE' ? 'toastContainerSuccess' : 'toastContainer'
        })
    },
    isEmptyString(str) {
        if (str === '' || str === undefined || str === null) {
            return true
        }
        return false
    },
    humanReadableDate(timestamp = '') {
        if (timestamp) {
            const time = timestamp.replace(' 00:00:00', '')
            let a = new Date(time).toUTCString()
            a = a.split('GMT')
            return a[0]
        } else {
            let a = new Date().toUTCString()
            a = a.split('GMT')
            return a[0]
        }
    },
    isObject(value) {
        if (value === null || value === undefined || value === "") {
            return false;
        }
        else if (Object.keys(value).length !== 0) {
            return true;
        }
        else {
            return false;
        }
    },
    isArray(data) {
        try {
            if (data.length)
                return true
            else
                return false
        } catch (e) {
            return false;
        }
    },
}

export default helper