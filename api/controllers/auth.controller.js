import jwt from 'jsonwebtoken';
import {KEY_FOR_TOKEN} from '../utils/resources.js';
import {connectTo1C} from '../utils/data1C.js';


export const login = async (req, res, next) => {
    try {
        let user_data = req.body;
        // console.log(user_data);
        const user = await connectTo1C(user_data);
        console.log(user);

        if (user.status === 'OK') {
            switch (user_data.login_type) {
                case "physical_key": {
                    user['authType'] = 'rfid';
                    const token = jwt.sign(user, KEY_FOR_TOKEN, {expiresIn: '30d'});
                    return res.status(200).json({...user, token})
                }

                case "username_phone": {
                    return res.status(200).json(user)
                }

                default:
                    return res.status(404).json({status: 'login_type not found'})
            }
        } else return res.status(404).json({status: 'not found'})

    } catch (e) {
        next(e)
    }
};


export const checkCode = async (req, res, next) => {
    try {
        const user = await connectTo1C(req.body);

        if(user.status === 'OK'){
            user['authType'] = 'phone';
            const token = jwt.sign(user, KEY_FOR_TOKEN, {expiresIn: '30d'});
            return res.status(200).json({...user, token})
        } else return res.status(400).json('Code timeout or code incorrect!')

    } catch (e) {
        next(e)
    }
};


export const getProfile = async (req, res, next) => {
    try {
        const {token} = req.body;

        const decoded = jwt.verify(token, KEY_FOR_TOKEN);

        return res.status(200).json(decoded);
    } catch (e) {
        next(e);
        res.status(401).json({error: 'Invalid token', message: 'Please relogin'});
    }
};

