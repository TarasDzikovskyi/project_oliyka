import {connectTo1C} from "../utils/data1C.js";

export const createProblem = async (req, res, next) => {
    try {
        console.log(req.body)


        // if(data.status === 'OK') return res.status(200).json(data);
        // else return res.status(400).json('Something wrong');
    } catch (e) {
        next(e);
        res.status(400).json({error: 'Can`t connect to 1C', message: 'Please try again!'});
    }
};
