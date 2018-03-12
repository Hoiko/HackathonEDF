import fetch from 'isomorphic-fetch';

export default class FetchAction {
    constructor(actions, dispatch) {
        this.validTypes = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        this.actions = actions;
        this.dispatch = dispatch;
        this.configuration = null;
    }

    initConfiguration(haveData) {
        const type = this.actions.payload.type;
        const headers =
            this.actions.payload.headers !== undefined
                ? this.actions.payload.headers
                : this.defaultHeaders;

        this.configuration = {
            method: type,
            headers,
            mode: 'cors',
        };

        if (haveData && this.checkIsFileRequest()) {
            delete this.configuration.headers['Content-Type'];
            const { data } = this.actions.payload;
            const formData = new FormData();

            for (const name in data) {
                if (data[name] != undefined) {
                    formData.append(name, data[name]);
                }
            }

            this.configuration.body = formData;
        } else if (haveData) {
            const { data } = this.actions.payload;
            this.configuration.body = JSON.stringify(data);
        }
    }

    checkIsFileRequest() {
        const { data } = this.actions.payload;
        for (const name in data) {
            if (data[name] instanceof File) {
                return true;
            }
        }
        return false;
    }

    async result() {
        const url = this.actions.payload.url;
        const response = await fetch(url, this.configuration);

        if (response.status < 300) {
            const data = response.status === 204 ? null : await response.json();
            const result = {
                type: `${this.actions.type}_SUCCESS`,
                payload: {
                    data,
                },
                error: false,
                meta: this.actions.meta ? { ...this.actions.meta } : {},
            };

            return result;
        } else {
            const data = await response.json();
            const error = {
                type: `${this.actions.type}_FAILURE`,
                payload: {
                    data,
                },
                error: true,
                meta: this.actions.meta ? { ...this.actions.meta } : {},
            };

            return error;
        }
    }

    isValid() {
        if (typeof this.actions.payload !== 'object' && !('type' in this.actions.payload)) {
            return false;
        }
        return this.isValidPayloadType();
    }

    isValidPayloadType() {
        const type = this.actions.payload.type;

        if (this.validTypes.includes(type)) {
            return this.haveRequiredParams(type);
        }
        return false;
    }

    haveRequiredParams(type) {
        if (type === 'GET' || type === 'DELETE') {
            if (Object.prototype.hasOwnProperty.call(this.actions.payload, 'url')) {
                this.initConfiguration(false);
                return true;
            }
            return false;
        }

        if (type === 'POST' || type === 'PUT' || type === 'PATCH') {
            if (
                Object.prototype.hasOwnProperty.call(this.actions.payload, 'url') &&
                Object.prototype.hasOwnProperty.call(this.actions.payload, 'data')
            ) {
                this.initConfiguration(true);
                return true;
            }
            return false;
        }

        return false;
    }
}
