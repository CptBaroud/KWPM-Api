let path = "../mot.json";
let json = require(path);
let fs = require('fs');

let word = {

    //permet de checker si le mot a une raltion avec l'informatique
    checkRelationWithName: function (array, def) {
        let sortie = [];
        let c = 0;
        let count = 0;
        let size = json.stockage.length;

        for (let a = 0; a < array.length; a++) {
            for (let b = 0; b < size; b++) {
                if (array[a].match(json.stockage[b])) {
                    console.log(array[a]);
                    if (isMatching(array[a]) > 2) {

                        sortie[c] = def[a];
                        c++;
                        write(array, a, b);
                        count ++;
                    } else if (checkDef(def[a]) > 2) {

                        sortie[c] = def[a];
                        c++;
                        write(array, a, b);
                        count ++;
                    }
                }
            }
        }
        for (let b = 0; b<array.length-count; b++){
            console.log("Le mot cle ne match pas avec le fichier .json");
            if(checkDef(def[b]) >= 1){
                sortie[c] = def[b];
                c++;
            }
        }

        console.log(sortie);
        return sortie[1];
    }

};

/**
 *  Permet de retourner le nombre de mot du mot matchant avec
 * @param mot
 * @returns {number}
 */
function isMatching(mot) {
    let number = 0;
    let jsonfile = fs.readFileSync("mot.json", 'utf-8');
    let temp = JSON.parse(jsonfile);
    for (let a = 0; a < temp.stockage.length; a++) {
        if (mot.match(temp.stockage[a])) {
            number++;
        }
    }
    return number;
}

function writeAsynch(array, pos, pos2) {

    fs.readFile("mot.json", "utf-8", function (err, data) {
        if (err) {
            console.log(err)
        } else {
            let newjson = JSON.parse(data);

            if (!newjson.stockage[pos2].match(array[pos])) {

                let temp = JSON.parse(JSON.stringify(json));
                let mot = array[pos].replace("(", "").replace(")", "");

                temp.temp.push(mot.substring(0, mot.length));

                let storage = JSON.stringify(temp);
                console.log("Storage : " + storage);
                fs.writeFile("mot.json", storage, "utf-8", function (err) {
                    if (err) {
                        console.log("jpeux pa ecrire fr" + err);
                    }
                })

            } else {
                console.log("le mot existe deja");
            }
        }
    })
}

function write(array, pos, pos2) {
    let jsonfile = fs.readFileSync("mot.json", "utf-8");
    let json = JSON.parse(jsonfile);

    console.log(json.temp.length);

    if (json.temp.length !== 0) {

        if (!json.stockage[pos2].match[array[pos]]) {

            for (let a = 0; a < json.temp.length; a++) {

                if (!json.temp[a] === array[pos]) {

                    let temp = JSON.parse(JSON.stringify(json));
                    let mot = array[pos].replace("(", "").replace(")", "");

                    temp.temp.push(mot.substring(0, mot.length));
                    let storage = JSON.stringify(temp);
                    fs.writeFileSync("mot.json", storage);
                }
            }
        }
    } else {

        if (!json.stockage[pos2].match(array[pos])) {

            let temp = JSON.parse(JSON.stringify(json));
            let mot = array[pos].replace("(", "").replace(")", "");

            temp.temp.push(mot.substring(0, mot.length));
            let storage = JSON.stringify(temp);
            fs.writeFileSync("mot.json", storage);
        }
    }
}

function checkDef(def) {
    let jsonfile = fs.readFileSync("mot.json", 'utf-8');
    let temp = JSON.parse(jsonfile);

    let compt = 0;
    let mot = [];
    let deftemp = def.split(" ");

    for (let a = 0; a < temp.stockage.length; a++) {
        for (let b = 0; b < deftemp.length; b++) {
            if (deftemp[b].match(temp.stockage[a])) {
                compt = compt + 1;
                mot[a] = deftemp[b];
            }
        }
    }
    console.log("Tab temp de mots : " + mot);
    console.log("Compt : " + compt);
    return compt;
}

module.exports = word;