import pkg from 'pg';
const { Pool } = pkg;  //підключення до БД PostgreSQL
import dotenv from 'dotenv';
dotenv.config();



export const SMS_LIVE_TIME = 20*60*1000;      //час життя коду СМС

export const TOKEN_LIVE_TIME = 180*24*60*60;      //час життя токену в сек

export const MAX_COUNT_OF_FUEL_REQUESTS_PER_DAY = 20;      //максимальна к-сть запитів по залишок палива на добу

export const FILE_STORAGE_PATH = "/mnt/NFS/AndroidStore/";

export const POST_OFFICE_PATH = 'http://192.168.176.100/';

export const KEY_FOR_TOKEN = process.env.KEY_FOR_TOKEN;

export const URL_1C = process.env.URL_1C;
export const URL_1C_MOLOT = process.env.URL_1C_MOLOT;
export const USERNAME_1C = process.env.USERNAME_1C;
export const PASS_1C = process.env.PASS_1C;


export const VisicarDB = new Pool({                 //конфіг конекту до Visicar
    host: '10.199.0.90',
    user: 'android_app',
    password:'gdfsjghdgf4234GHFG342vb',
    database:'eventdb',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
    coding: "UTF-8",
});

export const VisicarDBGeo = {
    DB: 'eventdb',
    DB_HOST: "10.199.0.90",
    DB_USER: "sent_geo_user",
    DB_PASSWORD: "FBLOEufLLs2o6sYjP06E",
};

export const VisicarDBWin1251 = new Pool({                 //конфіг конекту до Visicar
    host: '10.199.0.90',
    user: 'android_app',
    password:'gdfsjghdgf4234GHFG342vb',
    database:'eventdb',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
    coding: "WIN1251",
});

export const SmsOptions = {
    hostname:'10.50.55.71',
    port:8080,
    path: '/SmsSender/',
    method: 'post',
    timeout: 30000,
    headers: {
        'Content-type': 'application/json',
        // 'Content-Encoding':'UTF-8'
    }
};


export const ResponseCodes = {
    error: 0,
    incorrect_phone_number: 1,
    message_was_sent_for_authorization: 2,
    success: 4,
    wrong_authorization_code: 5,
    refresh_credential: 7,
    delete_credential: 9,
    task_not_exist: 10,
    error_during_insert: 11,
    task_closed: 12
};






