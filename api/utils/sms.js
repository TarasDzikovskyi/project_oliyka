import http from 'http';
import {SmsOptions} from './resources.js';

export function sendSms(to, text, callback) {
    let json_data = {};
    json_data.from = "oliyka server";
    json_data.to= to;
    json_data.text= text;
    let json_request = JSON.stringify(json_data);

    let req = http.request(SmsOptions, function(res) {
        let responce = "";
        res.on('data', function(data) {
            responce+=data.toString();

        });
        res.on("end", function() {
            process.stdout.write("sendSms: Sms send status: sms"+json_request.toString()+" responce: "+responce);
            callback(null,JSON.parse(responce));
        });
    });

    process.stdout.write("sendSms: Try send sms:"+json_request.toString());
    req.write(json_request.toString());

    req.on('error', function(e) {
        process.stdout.write("sendSms: SMS send failed. Sms:"+json_request.toString()+" Reason:" +e);
        callback(true);
    });
    req.end();
}

//"Відслідковування перевезення: Посилання: https://web.visicar.com/ Сервер: tsrv.visicar.com Логін: zzcm"

/*sendSms("380972652010", "Пароль: x7hJ4Lwx43a4lvvETcWA",function (err,res) {
    if (err)  log.error ("SMS send failed. Reason:" +e);
    else log.info(res);
});*/


// module.exports.sendSms = sendSms;