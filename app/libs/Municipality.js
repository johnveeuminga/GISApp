import * as axios from 'axios'

var municipalities;

async function getMunicipalities() {
    let res = await axios.get( 'http://localhost:8080/api/municipality/' );

    municipalities = res.data.data;

}

export {
    municipalities,
    getMunicipalities
}