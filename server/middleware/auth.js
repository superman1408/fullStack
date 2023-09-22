import jwt from 'jsonwebtoken';


const auth = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        // console.log(token)


        let decodedData;

        if (token && isCustomAuth) {
            // console.log("hello");
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else {
            // console.log("hello");
            decodedData = jwt.decode(token);//problem is here...
            // decodedData = jwt.decode(response.credential);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}


export default auth;

