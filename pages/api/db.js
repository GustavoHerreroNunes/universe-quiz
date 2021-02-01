import db from '../../db.json';

export default function dbHandler(request, response){
    if(request.method === 'OPTIONS'){
        response.status(200).end();
        return;
    }

   
    response.json(db);
}