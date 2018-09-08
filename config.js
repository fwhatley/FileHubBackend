import { prodConfigs } from './environment/environment.prod';
import { localConfigs } from './environment/environment';

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {localConfigs};

        case 'production':
            return {prodConfigs};

        default:
            return {localConfigs};
    }
};