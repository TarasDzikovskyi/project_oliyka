const types = ["Dispatcher of transport", "Manager of transport", "Mechanic of transport", "Logist of transport", "SENT transportation", "GolubCustomers"];
const categories = ["AK Sam", "AK Tank", "AK Tents", "GolubFullAccess" ];

class Acl {
    static getFromMemberOf(memberOf) {
        let res_group = {
            type: null,
            category: null
        };
        let membership = [];
        if(memberOf instanceof Array)
            membership = memberOf;
        else
            membership.push(memberOf);

        for (let group of membership) {
            let param = 'CN=';
            let start = group.indexOf(param) + param.length;
            let end = group.indexOf(',', start);
            let group_name = group.substring(start, end);

            if (types.includes(group_name))
                res_group.type = group_name;
            if (categories.includes(group_name))
                res_group.category = group_name;
        }

        return res_group;
    }

    static getFromUser(user) {
        let acl = {
            name: user.displayName,
            description: user.description,
            mail: user.mail,
            phonenumber: "+38" + user.mobile
        };
        let group = Acl.getFromMemberOf(user.memberOf);
        if (group.type !== null)
            switch (group.type) {
                case "Dispatcher of transport":
                    acl.type = "responsible";
                    break;
                case  "SENT transportation":
                    acl.type = "sent";
                    break;
                case  "GolubCustomers":
                    acl.type = "customer";
                    break;
                default:
                    acl.type = "actor";
            }
        else
            acl.type = null;

        switch (group.category) {
            case "AK Tank":
                acl.category = "tank";
                break;
            case "AK Tents":
                acl.category = "tent";
                break;
            case "AK Sam":
                acl.category = "sam";
                break;
            case "SENT transportation":
                acl.category = "sent";
                break;
            case "GolubFullAccess":
                acl.category = "all";
                break;
            default:
                acl.category = null;
        }
        return acl;
    }
}

module.exports = Acl;

/*
let  memberOf = [
        'CN=GolubFullAccess,OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR',
        'CN=Доступ к шлюзу(Администарторы),OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR',
        'CN=Manager of transport,OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR',
        'CN=Бітрікс24,OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR',
        'CN=GPS,OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR',
        'CN=Все Транс-Сервис-1,OU=Групи користувачів,OU=Trans-Service-1,OU=Organization,DC=OLIYAR'
    ];

console.log(JSON.stringify(Acl.getFromMemberOf(memberOf)));
*/


