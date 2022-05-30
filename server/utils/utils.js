exports.xml2json = xml2json;
exports.https_client = https_client;

/*xml2js*/
const xml2js = require('xml2js')
const xmlbuilder = new xml2js.Builder({headless: true})
const xmlparser = new xml2js.Parser({explicitArray: false})
function xml2json(xml) {
    return new Promise((resolve, reject) => {
        xmlparser.parseString(xml, function (err, json) {
            if (err){
                reject(err);
            }
            else{
                resolve(json);
            }
        });
    });
}


/*https client*/
var https = require('https');
function https_client(url) {
    return new Promise((resolve, reject) => {
        var data = '';
        https.get(url, res => {
            res.on('data', chunk => { data += chunk }) 
            res.on('end', () => {
               resolve(data);
            })
        }) 
    });
};
