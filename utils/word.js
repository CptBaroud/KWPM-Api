let path = "../mot.json";
let json = require(path);

let fs = require('fs');
let stopwords = require('nltk-stopwords');
let french = stopwords.load("french");

//TODO : lors du check des defintion ne verfier le mot qu'une fois
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

                        sortie[c] = array[a];
                        c++;
                        write(array, a, b);
                        count++;
                    } else if (checkDef(def[a]) > 2) {

                        sortie[c] = array[a];
                        c++;
                        write(array, a, b);
                        count++;
                    }
                }
            }
        }
        for (let b = 0; b < array.length - count; b++) {
            console.log("Le mot cle ne match pas avec le fichier .json");
            if (checkDef(def[b]) >= 2) {
                sortie[c] = def[b];
                c++;
            }
        }

        console.log(sortie);
        return sortie[0];
    },

    removeStopword: function (def) {
        for (let a = 0; a < def.length; a++) {
            tf(def[a]);
        }
    },

    removeFckingTags: function (page) {
        let key = Object.keys(page);
        let pageTemp = page[key];
        console.log(pageTemp["extract"]);
        console.log(pageTemp[key]["Extract"]);
        console.log(page[key]);
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
    let c = 0;
    let mot = [];
    let deftemp = def.split(" ");

    for (let a = 0; a < temp.stockage.length; a++) {
        for (let b = 0; b < deftemp.length; b++) {
            if (deftemp[b].match(temp.stockage[a])) {
                compt = compt + 1;
                mot[c] = deftemp[b];
                c++;
                temp.stockage[a].replace(deftemp[b], " ");
                console.log("Temp : " + temp.stockage[a]);
                console.log("DefTemp : " + deftemp[b] + " JSON : " + temp.stockage[a]);
            }
        }
    }

    console.log("Tab temp de mots : " + mot);
    console.log("Compt : " + compt);
    console.log("");

    return compt;
}

function removeStopwords(string) {
    return stopwords.remove(string, french);
}

function compt(string) {
    let str = string.replace(",", "").replace(".", "").replace("(", "").replace(")", "");
    let strTemp = stopwords.remove(str, french);
    let temp = strTemp.split(" ");
    let counts = {};
    console.log(str);
    for (let a = 0; a < temp.length; a++) {
        let word = temp[a].toLowerCase();
        if (!/\d+/.test(word)) {
            if (counts[word] === undefined) {
                counts[word] = 1;
            } else {
                counts[word] = counts[word] + 1;
            }
        }
    }

    return counts;
}

function tf(array) {
    let T = [];
    let t = 0;
    let word = compt(array);
    let keys = Object.keys(word);
    let out = {};

    for(let a=0; a<keys.length; a++){
        console.log(word[keys[a]]);
        out[keys[a]] = word[keys[a]]/keys.length;
    }

    console.log(out);
}


module.exports = word;