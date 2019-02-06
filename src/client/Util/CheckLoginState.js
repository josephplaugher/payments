import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = () => {
    return new Promise((resolve, reject) => {
        Ajax.get(SetUrl() + "/checkLoginState")
            .then(res => {
                resolve(res.headers);
            })
            .catch(e => { reject('error checking login state: ', e) });
    });
}

export default checkLoginState;