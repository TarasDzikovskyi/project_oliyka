import {connectTo1C} from '../utils/data1C.js';


export const getDataFrom1C = async (req, res, next) => {
    try {
        const data = await connectTo1C(req.body);

        if(data.status === 'OK' || data.status === 'open') return res.status(200).json(data);
        else return res.status(400).json('Something wrong');
    } catch (e) {
        next(e);
        res.status(400).json({error: 'Can`t connect to 1C', message: 'Please try again!'});
    }
};


export const getMap = async (req, res, next) => {
    try {

        const {uid, type, width, height} = req.body;
        const data = await connectTo1C({uid, type});


        if (data.status === 'OK') {
            data.Map.nodes.forEach(node => {
                node.position = {
                    x: Math.round((node.position.x * width) / 100),
                    y: Math.round((node.position.y * height) / 100)
                };

                node.positionAbsolute = {
                    x: Math.round((node.positionAbsolute.x * width) / 100),
                    y: Math.round((node.positionAbsolute.y * height) / 100)
                };

                node.width = Math.round((node.width * width) / 100);
                node.height = Math.round((node.height * height) / 100);

                node.style.width = Math.round((node.style.width * width) / 100);
                node.style.height = Math.round((node.style.height * height) / 100)
            });

            return res.status(200).json(data);

        } else return res.status(400).json('Something wrong');
    } catch (e) {
        next(e);
        res.status(400).json({error: 'Can`t connect to 1C', message: 'Please try again!'});
    }
};


export const saveMap = async (req, res, next) => {
    try {
        const {map, nodes, edges, width, height} = req.body;

        map.nodes = nodes;
        map.edges = edges;

        map.nodes.forEach(node => {
            node.position = {
                x: ((node.position.x / width)*100),
                y: ((node.position.y / height)*100)
            };

            node.positionAbsolute = {
                x: ((node.positionAbsolute.x / width)*100),
                y: ((node.positionAbsolute.y /height)*100)
            };

            node.width = (node.width / width)*100;
            node.height = (node.height / height)*100;

            node.style = {...node.style, width: (node.style.width / width)*100};
            node.style = {...node.style, height: (node.style.height / height)*100};
        });


        const user_data = {type: "set_object_map", Map: map};
        const data = await connectTo1C(user_data);


        if (data.status === 'OK') return res.status(200).json(data);
        else return res.status(400).json('Error by saving map');
    } catch (e) {
        next(e);
        res.status(400).json({error: 'Can`t connect to 1C', message: 'Please try again!'});
    }
};

