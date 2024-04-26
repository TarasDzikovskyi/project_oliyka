import https from "https";
import fetch from "node-fetch";
import {PASS_1C, URL_1C, USERNAME_1C, URL_1C_MOLOT} from "./resources.js";


export const connectTo1C = async (user_data, type) => {
    let response;
    try {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        if(user_data.credentials && user_data.credentials.startsWith('+380')) user_data.credentials = user_data.credentials.substring(1);

        if(type === 'MOLOT') {
            response = await fetch(URL_1C_MOLOT, {
                method: 'POST',
                body: JSON.stringify(user_data),
                agent: httpsAgent,
                headers: {
                    Authorization: `Basic ${Buffer.from(`${USERNAME_1C}:${PASS_1C}`).toString('base64')}`
                }
            });
        } else{
            response = await fetch(URL_1C, {
                method: 'POST',
                body: JSON.stringify(user_data),
                agent: httpsAgent,
                headers: {
                    Authorization: `Basic ${Buffer.from(`${USERNAME_1C}:${PASS_1C}`).toString('base64')}`
                }
            });
        }



        if(response.status === 200) return await response.json();
        else return {status: `${response.status}`, message: response.statusText}
    } catch (e) {
        console.log(e)
    }
};
