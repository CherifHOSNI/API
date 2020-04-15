let baseUrl = 'https://www.oddsportal.com/matches/soccer/';
let $ = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors')
$ = cheerioAdv.wrap($)
let puppeteer = require('puppeteer');
let moment = require('moment');
let mysql = require('mysql');
var crypto = require('crypto');
//define our logger
let ListeDesPlateformes = ['18bet', '1xBet', 'Asianodds', 'bet-at-home', 'bet365', 'Bethard', 'bwin', 'Coolbet', 'Marathonbet', 'Pinnacle', 'Unibet', 'William Hill', 'Betclic']


let connexionCreadentials = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api_data'
}

module.exports = {
    collectScheduledGamed: collectScheduledGamed
}


//collectScheduledGamed(20200412)

async function collectScheduledGamed(date) {

    let listOfGames = await getUrlsScheduledGames(date);
    //console.log(listOfGames)
    let games_odds = []
    if (listOfGames.length > 0) {
        for (let step = 0; step < listOfGames.length; step++) {
            //for (let step = 0; step < 10 ; step++) {
            //logger.info('Main : getting cotes for this game : '+ listOfGames[step])
            let Cotes = await getCotesFromURL(listOfGames[step]);
            //logger.verbose('Main : collected Cotes for this game : '+ listOfGames[step] + ' : ' + JSON.stringify(Cotes));
            //logger.info('Main : inserting Cotes for this Game : '+ listOfGames[step])
            if (Cotes != null) {
                await insertCotes(Cotes).then(res => {
                    // console.log(res);
                    games_odds = res;
                });
            }
            await updateGames_Odds(games_odds)

        }
    }
    return 'done collecting odds for: '+date;
}


async function updateGames_Odds(games_odds) {
    return new Promise(async function(resolve, reject) {
        for (let step = 0; step < games_odds.length + 1; step++) {

            if (step == games_odds.length) {
                resolve('done update_games_odds ')
            } else {
                let req = await defineReq('update_games_odds', games_odds[step]);
                await executeMySQLRequest(req).catch((err) => console.log('SC : ' + err));
            }

        }

    });
}
async function updategameStats(games_odds) {
    return new Promise(async function(resolve, reject) {

        let req = await defineReq('updategameStats', games_odds);
        await executeMySQLRequest(req).then(res => {

            let statsId = res.insertId;

            updategame_GameStats(games_odds.GameID, statsId)
            resolve('done updategameStats')
        }).catch((err) => {
            console.log('SC : ' + err)
            reject('error updategameStats')
        });




    });
}

async function updategame_GameStats(game_id, gamestats_id) {
    // a ecrire
    return new Promise(async function(resolve, reject) {
        let req = await defineReq('updategame_gameStats', game_id, gamestats_id);
        await executeMySQLRequest(req).then(res => {
            resolve('done updategame_gameStats')
        }).catch((err) => console.log('SC : ' + err));
    });
}

async function getCotesFromURL(url) {


    let scrappedObj = {
        HomeTeamName: null,
        AwayTeamName: null,
        HomeTeamID: null,
        AwayTeamID: null,
        homeTeamGoals: null,
        awayTeamGoals: null,
        GameID: null,
        date: null,
        datetime: null,
        Cotes: null,
        UrlDetails: url

    }
    let Cotes = [{
        Plateforme: '18bet',
        HomeWinCote: null,
        DrawCote: null,
        AwayWinCote: null,
        HomeWinDraw: null,
        HomeWinAwayWin: null,
        AwayWinDraw: null,
        DNB_HomeWin: null,
        DNB_AwayWin: null,
        Over05: null,
        Under05: null,
        Over15: null,
        Under15: null,
        Over25: null,
        Under25: null,
        Over35: null,
        Under35: null,
        Over45: null,
        Under45: null,
        Over55: null,
        Under55: null,
        BothTeamScoreYes: null,
        BothTeamScoreNo: null
    },
        {
            Plateforme: '1xBet',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Asianodds',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'bet-at-home',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'bet365',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Bethard',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'bwin',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Coolbet',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Marathonbet',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Pinnacle',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'Unibet',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        },
        {
            Plateforme: 'William Hill',
            HomeWinCote: null,
            DrawCote: null,
            AwayWinCote: null,
            HomeWinDraw: null,
            HomeWinAwayWin: null,
            AwayWinDraw: null,
            DNB_HomeWin: null,
            DNB_AwayWin: null,
            Over05: null,
            Under05: null,
            Over15: null,
            Under15: null,
            Over25: null,
            Under25: null,
            Over35: null,
            Under35: null,
            Over45: null,
            Under45: null,
            Over55: null,
            Under55: null,
            BothTeamScoreYes: null,
            BothTeamScoreNo: null
        }
    ]
    //logger.info('SC : updating cotes for this url ' +url)

    let html = "";
    await getHtmlScraped(url, '#odds-data-table > div ').then(
        function(res) {
            html = res;
        }
    ).catch(error => console.log(error))

    // logger.info('SC : getting teams names from this url ' +url)
    let teams = await getTeamsNameFromHtml(html)
    //logger.info('SC : getting dates from this url ' +url)
    let dates = await getDatesFromHtml(html);

    if (!teams || !dates) {
        //logger.info('SC : probleme occured getting teams names and dates from html for this url : '+url);
        //logger.info('SC : teams names and dates values : ' + JSON.stringify(teams) + '&&' + JSON.stringify(dates));
        return null;
    }

    scrappedObj.HomeTeamName = teams.HomeTeamName
    scrappedObj.AwayTeamName = teams.AwayTeamName
    //logger.info('SC : getting team IDS fro these names :  ' +scrappedObj.HomeTeamName + ' and  ' +scrappedObj.AwayTeamName)
    scrappedObj.HomeTeamID = await getTeamID(scrappedObj.HomeTeamName)
    scrappedObj.AwayTeamID = await getTeamID(scrappedObj.AwayTeamName)
    scrappedObj.date = dates.date
    scrappedObj.datetime = dates.datetime

    if (!scrappedObj.HomeTeamID || !scrappedObj.AwayTeamID) {
        //logger.info('SC : probleme occured getting teams names and dates from html for this url : '+url);
        //logger.info('SC : teams names and dates values : ' + JSON.stringify(teams) + '&&' + JSON.stringify(dates));
        return null;
    }
    scrappedObj.GameID = await getGameID(scrappedObj.date, scrappedObj.HomeTeamID, scrappedObj.AwayTeamID, scrappedObj.datetime)

    if (!scrappedObj.GameID) {
        //logger.info('SC : probleme occured getting teams names and dates from html for this url : '+url);
        //logger.info('SC : teams names and dates values : ' + JSON.stringify(teams) + '&&' + JSON.stringify(dates));
        return null;
    }

    let score = await getScoreFromHtml(html);
    if (score) {
        scrappedObj.homeTeamGoals = score.homeTeamGoals
        scrappedObj.awayTeamGoals = score.awayTeamGoals
        await updategameStats(scrappedObj).catch(err => console.log(err))
        //update calque
        await insertCalque(scrappedObj).catch(err => console.log(err))


    }

    //logger.info('SC : getting WinDrawLossCotes from html')
    Cotes = await getWinDrawLossCotesFromHtml(html, Cotes);

    urlVar = url + '#double;2'
    await getHtmlScraped(urlVar, '#odds-data-table > div ').then(
        function(res) {
            html = res;
        }
    ).catch(error => console.log(error))
    //logger.info('SC : getting DoubleChances from this url ' +url)


    Cotes = await getDoubleChancesFromHtml(html, Cotes);


    for (let j = 0; j < 6; j++) {
        urlVar = url + '#over-under;2;' + j + '.50;0'
        await getHtmlScraped(urlVar, '#odds-data-table > div ').then(
            function(res) {
                html = res;
            }
        ).catch(error => console.log(error))
        //logger.info('SC : getting OU '+j+'.5 from this url ' +url)
        Cotes = await getOUCoteFromHTML(html, Cotes, j)
    }


    urlVar = url + '#dnb;2';
    await getHtmlScraped(urlVar, '#odds-data-table > div ').then(
        function(res) {
            html = res;
        }
    ).catch(error => console.log(error))
    //logger.info('SC : getting DNBcotes from this url ' +url)
    Cotes = await getDNBcotesFromHtml(html, Cotes);


    urlVar = url + '#bts;2'
    await getHtmlScraped(urlVar, '#odds-data-table > div ').then(
        function(res) {
            html = res;
        }
    ).catch(error => console.log(error))
    //logger.info('SC : getting BothTeamScoreCotes from this url ' +url)
    Cotes = await getBothTeamScoreCotesFromHTML(html, Cotes);

    scrappedObj.Cotes = Cotes;

    return scrappedObj;

}


async function getHtmlScraped(url, selector) {

    //logger.info('SC : scrapping ' + url)

    return new Promise(async (resolve, reject) => {

        //logger.info('SC : launching browser getHtmlScraped');

        let brw = puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [
                '--ignore-certificate-errors',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--lang=en,en-US;q=0.9,en;q=0.8',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            ]
        });

        //logger.verbose('SC:  browser launched ')

        await brw.then(async function(browser) {
            brw = browser;
            let page = await browser.newPage().catch(err => console.log('error', err));
            await page.setViewport({
                width: 1000,
                height: 1000
            });


            await navigatePage(url, page).then(function(res) {
                page = res;
            })


            await navigatePage(url, page).then(function(res) {
                page = res;
            })




            // logger.info('SC :  navigated to :' + url)
            await page.waitForSelector(selector).catch(
                function(err) {
                    console.log('SC : error ' + err)
                    reject(err);
                }
            );
            let html = await page.content();
            //logger.info('SC : page  content received')
            //logger.info('SC : closing web page')


            //save a screenshot for the page
            //let date = new Date(moment().get('year'), moment().get('month'), moment().get('date'));
            //let d = formatDate(date);
            //createFileIfNotExist(d);
            //await page.screenshot({path: './IMG/'+d+'/number_'+compteur+'.png'})
            //logger.info('SC : screen shot taken in ./IMG/'+d+'/'+compteur)
            //compteur=compteur+1;

            await brw.close().catch(
                function(err) {
                    //logger.error('SC : error'+err)
                    reject(err);
                }
            );

            setTimeout(() => {
                // logger.info('SC : returning HTML');
                resolve(html);
            }, 1000);

        });

    })
}
async function getTeamsNameFromHtml(html) {
    let HomeTeamName = null;
    let AwayTeamName = null;

    try {
        //logger.info('SC : getting hometeam name')
        HomeTeamName = $('#col-content > h1', html).text().split(' - ')[0];
        //supprimer le dernier caractere qui est un espace
        if (HomeTeamName[HomeTeamName.length - 1] == ' ') {
            HomeTeamName = HomeTeamName.substring(0, HomeTeamName.length - 1);
        }
    } catch (e) {
        console.log('SC : ' + e)
        return null;
    }

    try {
        // logger.info('SC : getting awayteam name')
        AwayTeamName = $('#col-content > h1', html).text().split(' - ')[1];
        //supprimer le premier caractere qui est un espace
        if (AwayTeamName[0] == ' ') {
            AwayTeamName = AwayTeamName.substring(1, AwayTeamName.length);
        }
        //
    } catch (e) {
        console.log('SC : ' + e)
        return null;
    }

    //logger.info('SC : teams names detected :' + HomeTeamName +' && '+ AwayTeamName)

    return {
        'HomeTeamName': HomeTeamName,
        'AwayTeamName': AwayTeamName
    }
}

function getDatesFromHtml(html) {
    let date, datetime;
    try {
        let dateoriginal = $('#col-content > p.date', html).text()
        date = formatDate2(new Date(dateoriginal));
        datetime = formatDatetime(new Date(dateoriginal));
    } catch (e) {
        console.log('SC : ' + e)
        return null;
    }

    return {
        date: date,
        datetime: datetime
    }

}

async function getTeamID(TeamName) {

    //logger.info('SC : searching for team='+TeamName+' in DB')
    let teamInfos = await searchTeamExistInDB(TeamName);

    if (teamInfos.length > 0) {
        //logger.info('SC : team found : ' + JSON.stringify(teamInfos))
        return teamInfos[0].team_id;
    } else {
        //logger.info('SC : ' +TeamName + ' not found in DB')
        //logger.info('SC : no team similar to ' +TeamName +' found in DB')
        let req = await defineReq('insertNewTeam', TeamName);
        await executeMySQLRequest(req).catch((err) => console.log('SC : ' + err));

        //logger.info('SC : returning team id')
        let teamInfos = await searchTeamExistInDB(TeamName);
        return teamInfos[0].team_id;
    }
    return null;

}

async function getGameID(date, HomeTeamID, AwayTeamID, datetime) {

    //logger.info('SC : searching for team='+TeamName+' in DB')
    let gameInfo = await searchGameExistInDB(date, HomeTeamID, AwayTeamID);

    if (gameInfo.length > 0) {
        //logger.info('SC : team found : ' + JSON.stringify(teamInfos))
        return gameInfo[0].game_id;
    } else {
        //logger.info('SC : ' +TeamName + ' not found in DB')
        //logger.info('SC : no team similar to ' +TeamName +' found in DB')
        let req = await defineReq('insertNewGame', datetime, HomeTeamID, AwayTeamID);
        await executeMySQLRequest(req).catch((err) => console.log('SC : ' + err));

        //logger.info('SC : returning team id')
        let gameInfo = await searchGameExistInDB(date, HomeTeamID, AwayTeamID);
        return gameInfo[0].game_id;
    }
}


async function insertCotes(objCotes) {

    let response = []
    // logger.verbose('SC : trying to insert these cotes : '+ JSON.stringify(objCotes));
    for (let step = 0; step < objCotes.Cotes.length; step++) {
        let req = await defineReq('insertCotes', objCotes, step);
        if (req) {
            await executeMySQLRequest(req).then(function(result) {
                response.push({
                    HomeTeamName: objCotes.HomeTeamName,
                    AwayTeamName: objCotes.AwayTeamName,
                    HomeTeamID: objCotes.HomeTeamID,
                    AwayTeamID: objCotes.AwayTeamID,
                    homeTeamGoals: objCotes.homeTeamGoals,
                    awayTeamGoals: objCotes.awayTeamGoals,
                    GameID: objCotes.GameID,
                    date: objCotes.date,
                    datetime: objCotes.datetime,
                    OddsID: result.insertId,
                    //responseInsert: JSON.stringify(result)
                })
            }).catch(async (err) => {
                //logger.error('SC : '+err );
                let req = await defineReq('updateCote', objCotes, step);
                if (req) {
                    await executeMySQLRequest(req).then(function(result) {
                        console.log(result)
                        /*response.push({
                            HomeTeamName: objCotes.HomeTeamName,
                            AwayTeamName: objCotes.AwayTeamName,
                            HomeTeamID: objCotes.HomeTeamID,
                            AwayTeamID: objCotes.AwayTeamID,
                            homeTeamGoals: objCotes.homeTeamGoals,
                            awayTeamGoals: objCotes.awayTeamGoals,
                            GameID: objCotes.GameID,
                            date: objCotes.date,
                            datetime: objCotes.datetime,
                            OddsID: result.insertId,
                            //responseInsert: JSON.stringify(result)
                        })*/
                    }).catch(err => {
                        //   logger.error('SC : '+err );
                    })
                }

            });
        }
    }
    // logger.info('SC : ' + response);
    return response;
}

async function getUrlsScheduledGames(d) {
    //date format YYYYMMDD
    //let date = formatDate(d);
    let date = d;
    let url = baseUrl + date + '/';
    let html = "";
    let listOfGames = [];
    //logger.info('SC : getting html for this url : ' +url);
    await getHtmlScraped(url, '#table-matches > table > tbody > tr').then(
        function(res) {
            html = res;
        }
    ).catch(error => console.log(error))
    if (html) {
        // logger.info('SC : getting list of games from html')
        listOfGames = await extractUrlGamesFromHTML(html);
        // logger.verbose('SC : got list of games' + JSON.stringify(listOfGames))
    } else {
        console.log('SC : no games in html for this url : ' + url);
    }
    return listOfGames
}

async function navigatePage(url, page) {

    return new Promise(async function(resolve, reject) {
        page.goto(url, {
            waitUntil: 'domcontentloaded'
        }).then(() => {
            setTimeout(() => {
                resolve(page);
            }, 500);
        }).catch(err => console.log('error', err));

    });
}

function getOUCoteFromHTML(html, Cotes, j) {


    //console.log($('#bettype-tabs > ul > li.active > strong > span', html).text() );
    //console.log($('#bettype-tabs.tab-nav-detail ul.ul-nav li.active strong span', html).text())

    if ($('#bettype-tabs > ul > li.active > strong > span', html).text() == 'Over/Under') {
        $('#odds-data-table > div', html).each(function() {
            if ($('div > strong > a', $(this).html()).text() == 'Over/Under +' + j + '.5' + ' ') {

                $('table > tbody > tr', $(this).html()).each(async function() {

                    let plateforme = $('td:eq(0)', $(this).html()).text().trim();
                    let over = $('td:eq(2)', $(this).html()).text();
                    let under = $('td:eq(3)', $(this).html()).text();

                    if (over.length == 0) {
                        over = null;
                    }
                    if (under.length == 0) {
                        under = null;
                    }
                    if (plateforme.length == 0) {
                        plateforme = null;
                    }


                    if (plateforme != '' && ListeDesPlateformes.indexOf(plateforme) > -1) {
                        //if (plateforme != null) {
                        let index = getIndexPlateformeFromCotes(plateforme, Cotes);
                        if (index) {
                            let obj = Cotes[index];
                            obj['Over' + j + '5'] = over;
                            obj['Under' + j + '5'] = under;
                            Cotes[index] = obj;
                        }

                    } else {
                        //   logger.info('SC : plateforme dont exist');
                    }

                });

            }

        });
    } else {
        //  logger.info('SC : Over'+j+'5' + ' and ' + 'Under'+j+'5' + 'are null');
    }

    //  logger.verbose(JSON.stringify(Cotes));
    return Cotes;


}

function getWinDrawLossCotesFromHtml(html, Cotes) {
    // console.log($('#bettype-tabs > ul > li.active', html).text())
    if ($('#bettype-tabs > ul > li.first.active', html).text() == '1X2') {
        $('#odds-data-table > div > table > tbody > tr', html).each(function() {
            let plateforme = $('td:eq(0)', $(this).html()).text().trim();
            let HT = $('td:eq(1)', $(this).html()).text();
            let DRAW = $('td:eq(2)', $(this).html()).text();
            let AW = $('td:eq(3)', $(this).html()).text();

            if (HT.length == 0) {
                HT = null;
            }
            if (DRAW.length == 0) {
                DRAW = null;
            }
            if (AW.length == 0) {
                AW = null;
            }
            if (plateforme != '' && ListeDesPlateformes.indexOf(plateforme) > -1) {
                let index = getIndexPlateformeFromCotes(plateforme, Cotes);
                if (index) {
                    Cotes[index].HomeWinCote = HT;
                    Cotes[index].DrawCote = DRAW;
                    Cotes[index].AwayWinCote = AW;
                }
            } else {
                // console.log('SC : plateforme = '+plateforme+' dont exist');
            }
        });
    } else {
        // console.log('SC : HomeWinCote, DrawCote and AwayWinCote are null in the html');
    }
    return Cotes;
}

function getDNBcotesFromHtml(html, Cotes) {
    // console.log($('#bettype-tabs > ul > li.active', html).text())
    if ($('#bettype-tabs > ul > li.active', html).text() == 'Draw No Bet') {
        $('#odds-data-table > div > table > tbody > tr', html).each(function() {

            let plateforme = $('td:eq(0)', $(this).html()).text().trim();
            let HomeWin = $('td:eq(1)', $(this).html()).text();
            let AwayWin = $('td:eq(2)', $(this).html()).text();

            if (HomeWin.length == 0) {
                HomeWin = null;
            }
            if (AwayWin.length == 0) {
                AwayWin = null;
            }

            if (plateforme != '' && ListeDesPlateformes.indexOf(plateforme) > -1) {
                let index = getIndexPlateformeFromCotes(plateforme, Cotes);
                if (index) {
                    Cotes[index].DNB_HomeWin = HomeWin;
                    Cotes[index].DNB_AwayWin = AwayWin;
                }
            } else {
                // logger.info('SC : plateforme dont exist');

            }

        });
    } else {
        // logger.info('SC : DNB_HomeWin and DNB_AwayWin are null');

    }

    //logger.verbose(JSON.stringify(Cotes));
    return Cotes;
}

function getBothTeamScoreCotesFromHTML(html, Cotes) {
    //console.log($('#bettype-tabs > ul > li.active', html).text())

    if ($('#tab-sport-others > span', html).text() == 'Both Teams to Score') {
        $('#odds-data-table > div > table > tbody > tr', html).each(function() {

            let plateforme = $('td:eq(0)', $(this).html()).text().trim();
            let YES = $('td:eq(1)', $(this).html()).text();
            let NO = $('td:eq(2)', $(this).html()).text();

            if (YES.length == 0) {
                YES = null;
            }
            if (NO.length == 0) {
                NO = null;
            }


            if (plateforme != '' && ListeDesPlateformes.indexOf(plateforme) > -1) {
                let index = getIndexPlateformeFromCotes(plateforme, Cotes);
                if (index) {
                    Cotes[index].BothTeamScoreYes = YES;
                    Cotes[index].BothTeamScoreNo = NO;
                }
            } else {
                // logger.info('SC : plateforme dont exist');

            }

        });
    } else {
        // logger.info('SC : DNB_HomeWin and DNB_AwayWin are null');
    }

    //logger.verbose(JSON.stringify(Cotes));
    return Cotes;
}

function getDoubleChancesFromHtml(html, Cotes) {
    //console.log($('#bettype-tabs > ul > li.active', html).text())

    if ($('#bettype-tabs > ul > li.active > strong > span', html).text() == 'Double Chance') {
        $('#odds-data-table > div > table > tbody > tr', html).each(function() {

            let plateforme = $('td:eq(0)', $(this).html()).text().trim();
            let HomeWinDraw = $('td:eq(1)', $(this).html()).text();
            let HomeWinAwayWin = $('td:eq(2)', $(this).html()).text();
            let AwayWinDraw = $('td:eq(3)', $(this).html()).text();

            if (HomeWinDraw.length == 0) {
                HomeWinDraw = null;
            }
            if (AwayWinDraw.length == 0) {
                AwayWinDraw = null;
            }
            if (HomeWinAwayWin.length == 0) {
                HomeWinAwayWin = null;
            }

            if (plateforme != '' && ListeDesPlateformes.indexOf(plateforme) > -1) {
                let index = getIndexPlateformeFromCotes(plateforme, Cotes);
                if (index) {
                    Cotes[index].HomeWinDraw = HomeWinDraw;
                    Cotes[index].HomeWinAwayWin = HomeWinAwayWin;
                    Cotes[index].AwayWinDraw = AwayWinDraw;
                }
            } else {
                //console.log('SC : plateforme dont exist');
            }

        });
    } else {
        // console.log('SC : HomeWinDraw, HomeWinAwayWin and AwayWinDraw are null');
    }

    return Cotes;
}

//return the index of item that have the same plateform
function getIndexPlateformeFromCotes(Plateforme, Cotes) {
    for (let i = 0; i < Cotes.length; i++) {
        if (Cotes[i].Plateforme == Plateforme) {
            return i;
        }
    }
    return null;
}

function extractUrlGamesFromHTML(html) {
    let listOfGames = [];
    $('#table-matches > table > tbody > tr', html).each(function() {
        $('td.name.table-participant > a', $(this).html()).each(function() {
            if ($(this).attr('href').indexOf("javascript:") < 0) {
                listOfGames.push('https://www.oddsportal.com' + $(this).attr('href'));
            }
        })
    });

    return listOfGames;
}

function executeMySQLRequest(req) {


    let connexion = mysql.createConnection(connexionCreadentials);
    return new Promise(async function(resolve, reject) {
        await connexion.connect(function(err) {
            if (err) {
                console.log('DB :  An error encountered trying to connect to DB and generated error : ' + err);
                reject('Could not connect to db');
            };
            //logger.verbose('DB : Successfully connected to DB and now trying to execute request '+ req);
        });


        await connexion.query(req,
            function(error, results, fields) {
                if (error) {
                    console.log('DB : An error encountered trying to execute request ' + req + '  and got next error : ' + error);
                    reject(error);

                } else {
                    //logger.verbose( 'DB : Request executed successfully and got this next response : ' + JSON.stringify(results))
                    resolve(JSON.parse(JSON.stringify(results)));
                }
            });

        await connexion.end();
        //logger.info('DB : Closing connexion after success ')

    });

}

async function searchTeamExistInDB(TeamName) {
    let teamInfos = [];
    let req = "select * from teams where teamname = '" + addslashes(TeamName) + "'";
    //logger.info('DB : trying to execute this next request : ' +req )
    await executeMySQLRequest(req).then(function(result) {
        teamInfos = result
    }).catch((err) => console.log('DB : ' + err));
    return teamInfos;
}

async function searchGameExistInDB(date, HomeTeamID, AwayTeamID) {
    let gameinfo = [];
    let req = "select * from games where homeTeam_id = " + HomeTeamID + " " +
        " and awayTeam_id = " + AwayTeamID + " and  DATE_FORMAT(`datetime`,  '%Y-%m-%d')  = '" + date + "' ";
    //logger.info('DB : trying to execute this next request : ' +req )
    await executeMySQLRequest(req).then(function(result) {
        gameinfo = result
    }).catch((err) => console.log('DB : ' + err));
    return gameinfo;
}

function getScoreFromHtml(html) {
    let homeTeamGoals = null;
    let awayTeamGoals = null;

    try {
        // logger.info('SC : getting team score')
        homeTeamGoals = $('#event-status > p > strong', html).text().split(':')[0];
    } catch (e) {
        //  logger.error(e)
    }

    try {
        // logger.info('SC : getting team score')
        awayTeamGoals = $('#event-status > p > strong', html).text().split(':')[1].split(' ')[0];
    } catch (e) {
        // logger.error(e)
    }

    //logger.info('SC : team score detected : '+ homeTeamGoals +' && ' + awayTeamGoals)
    if (homeTeamGoals && awayTeamGoals) {
        return {
            'homeTeamGoals': homeTeamGoals,
            'awayTeamGoals': awayTeamGoals
        }
    } else {
        return null;
    }
}

async function insertCalque(stats) {

    let response = null;
    let req = await defineReq("insertCalque", stats);
    //logger.info('SC : Defining request for calque : '+req2);
    await executeMySQLRequest(req).then(function(res) {
        response = res;
        //logger.info('SC : calque inserted ')
    }).catch(function(err) {
        //logger.info('SC :error inserting calque');
        console.log('SC : ' + err)
    });

    //a verifier
    return response;
}


function formatDate(date) {
    //date format YYYYMMDD
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
}

function formatDate2(date) {
    //date format YYYY-MM-DD
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function formatDatetime(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    hours = d.getHours();
    minutes = d.getMinutes();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    today = [year, month, day].join('-');
    totime = [hours, minutes, '00'].join(':');
    return [today, totime].join(' ');
}

function addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}

async function getLastIDinDB() {
    let id = 0;
    let req1 = "select team_id from teams order by team_id Desc limit 1;"
    await executeMySQLRequest(req1).then(function(res) {
        id = res[0].team_id;
    }).catch(error => console.log('DB : ' + error));
    return id;
}


async function defineReq(param, obj1, obj2, obj3) {
    if (param == 'update_games_odds') {
        //console.log(obj1)
        let req = "INSERT INTO api_data.games_odds ( game_id, odds_id ) VALUES (" + obj1.GameID + ", " + obj1.OddsID + " );"

        return req;
    }
    if (param == 'updategameStats') {
        let req = "INSERT INTO api_data.gamestats ( game_id, HomeGoalsNumber, AwayGoalsNumber ) VALUES (" + obj1.GameID + ", " + obj1.homeTeamGoals + ", " + obj1.awayTeamGoals + " );"

        return req;
    }
    if (param == 'updategame_gameStats') {
        let req = "INSERT INTO api_data.games_gamestats ( game_id, gamestats_id ) VALUES (" + obj1 + ", " + obj2 + " );"

        return req;
    }
    if (param == "insertNewTeam") {

        let id = await getLastIDinDB();
        id = id + 1;
        //obj1 teamname
        let req = "INSERT INTO teams (teamname, team_id, identifier) VALUES ('" + addslashes(obj1) + "' , " + id + " , " + id + ")"
        // logger.info('DB : defining request : '+req)
        return req;
    }
    if (param == "insertNewGame") {
        let req = "INSERT INTO games (datetime, homeTeam_id, awayTeam_id) VALUES ('" + obj1 + "' , " + obj2 + " , " + obj3 + ")"
        // logger.info('DB : defining request : '+req)
        return req;
    }
    if (param == "updateTeamID") {
        // console.log(param, obj1, obj2, obj3)
        //obj1 teamname
        //obj2 teamID
        let req = "UPDATE " + teams_table + " SET teamID = " + obj2 + " WHERE teamName = '" + addslashes(obj1) + "'"
        //logger.info('DB : defining request : '+req)
        return req;
    }
    if (param == "updateStats") {
        //obj1 have all stats values
        let req = "INSERT INTO " + stats_table + " (HomeTeam, AwayTeam, IDHomeTeam, IDAwayTeam, HomeGoalsNumber, AwayGoalsNumber, Date, urldetails)" +
            " VALUES ('" + addslashes(obj1.HomeTeamName) + "', '" + addslashes(obj1.AwayTeamName) + "', '" + obj1.HomeTeamID + "', '" + obj1.AwayTeamID + "', '" + obj1.homeTeamGoals + "', '" + obj1.awayTeamGoals + "', '" + obj1.date + "', '" + obj1.urldetails + "')"
        logger.info('DB : defining request : ' + req)
        return req;
    }
    if (param == "insertCalque") {
        //obj1 have all stats values
        let req = ""

        //console.log(obj1)
        let HomeTeamGoals = obj1.homeTeamGoals
        let AwayTeamGoals = obj1.awayTeamGoals
        let GameID = obj1.GameID

        let HomeWinCote = 0;
        let DrawCote = 0;
        let AwayWinCote = 0;
        let HomeWinDraw = 0;
        let HomeWinAwayWin = 0;
        let AwayWinDraw = 0;
        let Over05 = 0;
        let Under05 = 0;
        let Over15 = 0;
        let Under15 = 0;
        let Over25 = 0;
        let Under25 = 0;
        let Over35 = 0;
        let Under35 = 0;
        let Over45 = 0;
        let Under45 = 0;
        let Over55 = 0;
        let Under55 = 0;
        let BothTeamScoreYes = 0;
        let BothTeamScoreNo = 0;
        let DNB_HomeWin = 0;
        let DNB_AwayWin = 0;



        if (HomeTeamGoals > AwayTeamGoals) {
            DNB_HomeWin = 1;
        }
        if (HomeTeamGoals < AwayTeamGoals) {
            DNB_AwayWin = 1;
        }


        if ((HomeTeamGoals + AwayTeamGoals) == 0) {
            DrawCote = 1;
            Under05 = 1;
            Under15 = 1;
            Under25 = 1;
            Under35 = 1;
            Under45 = 1;
            Under55 = 1;
            BothTeamScoreNo = 1;
            HomeWinDraw = 1;
            AwayWinDraw = 1;
        }
        if ((HomeTeamGoals + AwayTeamGoals) == 1) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;
            }
            Over05 = 1;
            Under15 = 1;
            Under25 = 1;
            Under35 = 1;
            Under45 = 1;
            Under55 = 1;
            BothTeamScoreNo = 1;

        }
        if ((HomeTeamGoals + AwayTeamGoals) == 2) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;

                BothTeamScoreNo = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;

                BothTeamScoreNo = 1;
            }
            if ((HomeTeamGoals - AwayTeamGoals) == 0) {
                DrawCote = 1;

                HomeWinDraw = 1;
                AwayWinDraw = 1;
                BothTeamScoreYes = 1;

            }
            Over05 = 1;
            Over15 = 1;
            Under25 = 1;
            Under35 = 1;
            Under45 = 1;
            Under55 = 1;

        }

        if ((HomeTeamGoals + AwayTeamGoals) == 3) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals == 0) || (AwayTeamGoals == 0)) {
                BothTeamScoreNo = 1;
            } else {
                BothTeamScoreYes = 1;
            }
            Over05 = 1;
            Over15 = 1;
            Over25 = 1;
            Under35 = 1;
            Under45 = 1;
            Under55 = 1;

        }

        if ((HomeTeamGoals + AwayTeamGoals) == 4) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals - AwayTeamGoals) == 0) {
                DrawCote = 1;
                HomeWinDraw = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals == 0) || (AwayTeamGoals == 0)) {
                BothTeamScoreNo = 1;
            } else {
                BothTeamScoreYes = 1;
            }
            Over05 = 1;
            Over15 = 1;
            Over25 = 1;
            Over35 = 1;
            Under45 = 1;
            Under55 = 1;

        }

        if ((HomeTeamGoals + AwayTeamGoals) == 5) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals == 0) || (AwayTeamGoals == 0)) {
                BothTeamScoreNo = 1;
            } else {
                BothTeamScoreYes = 1;
            }
            Over05 = 1;
            Over15 = 1;
            Over25 = 1;
            Over35 = 1;
            Over45 = 1;
            Under55 = 1;

        }


        if ((HomeTeamGoals + AwayTeamGoals) >= 6) {
            if (HomeTeamGoals > AwayTeamGoals) {
                HomeWinCote = 1;
                HomeWinDraw = 1;
                HomeWinAwayWin = 1;
            }
            if (HomeTeamGoals < AwayTeamGoals) {
                AwayWinCote = 1;
                HomeWinAwayWin = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals - AwayTeamGoals) == 0) {
                DrawCote = 1;
                HomeWinDraw = 1;
                AwayWinDraw = 1;
            }
            if ((HomeTeamGoals == 0) || (AwayTeamGoals == 0)) {
                BothTeamScoreNo = 1;
            } else {
                BothTeamScoreYes = 1;
            }
            Over05 = 1;
            Over15 = 1;
            Over25 = 1;
            Over35 = 1;
            Over45 = 1;
            Over55 = 1;

        }

        req = " INSERT INTO api_data.oddsCalques (  game_id , HomeWinCote, DrawCote, AwayWinCote ,HomeWinDraw, HomeWinAwayWin, AwayWinDraw, Over05, Under05, Over15, Under15, Over25, Under25, Over35, Under35, Over45, Under45, Over55, Under55, BothTeamScoreYes, BothTeamScoreNo, DNB_HomeWin, DNB_AwayWin ) VALUES " +
            "( " + GameID + ", " + HomeWinCote + ", " + DrawCote + ", " + AwayWinCote + "   , " + HomeWinDraw + ", " + HomeWinAwayWin + ", " + AwayWinDraw + ", " + Over05 + ", " + Under05 + ", " + Over15 + " , " + Under15 + ", " + Over25 + ", " + Under25 + ", " + Over35 + ", " + Under35 + ", " + Over45 + ", " + Under45 + ", " + Over55 + "   , " + Under55 + " , " + BothTeamScoreYes + " , " + BothTeamScoreNo + ", " + DNB_HomeWin + ",  " + DNB_AwayWin + " )";
        //logger.info('DB : defining request : '+req)
        return req;
    }
    if (param == 'insertCotes') {
        let bool = false; //pour tester if there are any cotes to insert
        let req = ""
        let cotes = obj1.Cotes[obj2]

        columns = "game_id , plateformename, url";
        values = obj1.GameID + ', ' + '\'' + cotes.Plateforme + '\'' + ', ' + '\'' + obj1.UrlDetails + '\'';


        if (cotes.HomeWinCote && cotes.DrawCote && cotes.AwayWinCote) {
            columns = columns + ', HomeWinCote, DrawCote, AwayWinCote';
            values = values + ', ' + cotes.HomeWinCote + ', ' + cotes.DrawCote + ', ' + cotes.AwayWinCote
            bool = true;
        }

        if (cotes.HomeWinDraw && cotes.HomeWinAwayWin && cotes.AwayWinDraw) {
            columns = columns + ', HomeWinDraw, HomeWinAwayWin, AwayWinDraw';
            values = values + ', ' + cotes.HomeWinDraw + ', ' + cotes.HomeWinAwayWin + ', ' + cotes.AwayWinDraw;
            bool = true;
        }
        if (cotes.DNB_HomeWin && cotes.DNB_AwayWin) {
            columns = columns + ', DNB_HomeWin, DNB_AwayWin';
            values = values + ', ' + cotes.DNB_HomeWin + ', ' + cotes.DNB_AwayWin;
            bool = true;
        }

        if (cotes.Over05 && cotes.Under05) {
            columns = columns + ', Over05, Under05';
            values = values + ', ' + cotes.Over05 + ', ' + cotes.Under05;
            bool = true;
        }

        if (cotes.Over15 && cotes.Under15) {
            columns = columns + ', Over15, Under15';
            values = values + ', ' + cotes.Over15 + ', ' + cotes.Under15;
            bool = true;
        }

        if (cotes.Over25 && cotes.Under25) {
            columns = columns + ', Over25, Under25';
            values = values + ', ' + cotes.Over25 + ', ' + cotes.Under25;
            bool = true;
        }

        if (cotes.Over35 && cotes.Under35) {
            columns = columns + ', Over35, Under35';
            values = values + ', ' + cotes.Over35 + ', ' + cotes.Under35;
            bool = true;
        }

        if (cotes.Over45 && cotes.Under45) {
            columns = columns + ', Over45, Under45';
            values = values + ', ' + cotes.Over45 + ', ' + cotes.Under45;
            bool = true;
        }

        if (cotes.Over55 && cotes.Under55) {
            columns = columns + ', Over55, Under55';
            values = values + ', ' + cotes.Over55 + ', ' + cotes.Under55;
            bool = true;
        }

        if (cotes.BothTeamScoreYes && cotes.BothTeamScoreNo) {
            columns = columns + ', BothTeamScoreYes, BothTeamScoreNo';
            values = values + ', ' + cotes.BothTeamScoreYes + ', ' + cotes.BothTeamScoreNo;
            bool = true;
        }


        if (bool == true) {
            req = "INSERT INTO api_data.odds ( " + columns + "  )\n" +
                "VALUES ( " + values + " );"

            //  logger.info('DB : defining request : '+req)
            return req;
        } else {
            return null;
        }

    }
    if (param == 'updateCote') {
        let bool = false; //pour tester if there are any cotes to update
        let req = "UPDATE api_data.odds SET "
        let cotes = obj1.Cotes[obj2]
        if (cotes.HomeWinCote && cotes.DrawCote && cotes.AwayWinCote) {
            req = req + " HomeWinCote = " + cotes.HomeWinCote + "" +
                ", DrawCote = " + cotes.DrawCote + "" +
                ", AwayWinCote = " + cotes.AwayWinCote + "  "
            bool = true;
        }

        if (cotes.HomeWinDraw && cotes.HomeWinAwayWin && cotes.AwayWinDraw) {
            req = req + ", HomeWinDraw = " + cotes.HomeWinDraw + "" +
                ", HomeWinAwayWin = " + cotes.HomeWinAwayWin + "" +
                ", HomeWinAwayWin = " + cotes.AwayWinDraw + "  "
            bool = true;
        }

        if (cotes.DNB_HomeWin && cotes.DNB_AwayWin) {
            req = req + ", DNB_HomeWin = " + cotes.DNB_HomeWin + "" +
                ", DNB_AwayWin = " + cotes.DNB_AwayWin + ""
            bool = true;
        }


        if (cotes.Over05 && cotes.Under05) {
            req = req + ", Under05 = " + cotes.Under05 + "" +
                ", Over05 = " + cotes.Over05 + ""
            bool = true;
        }

        if (cotes.Over15 && cotes.Under15) {
            req = req + ", Over15 = " + cotes.Over15 + "" +
                ", Under15 = " + cotes.Under15 + ""
            bool = true;
        }

        if (cotes.Over25 && cotes.Under25) {
            req = req + ", Over25 = " + cotes.Over25 + "" +
                ", Under25 = " + cotes.Under25 + ""
            bool = true;
        }

        if (cotes.Over35 && cotes.Under35) {
            req = req + ", Over35 = " + cotes.Over35 + "" +
                ", Under35 = " + cotes.Under35 + ""
            bool = true;
        }

        if (cotes.Over45 && cotes.Under45) {
            req = req + ", Over45 = " + cotes.Over45 + "" +
                ", Under45 = " + cotes.Under45 + ""
            bool = true;
        }

        if (cotes.Over55 && cotes.Under55) {
            req = req + ", Over55 = " + cotes.Over55 + "" +
                ", Under55 = " + cotes.Under55 + ""
            bool = true;
        }

        if (cotes.BothTeamScoreYes && cotes.BothTeamScoreNo) {
            req = req + ", BothTeamScoreYes = " + cotes.BothTeamScoreYes + "" +
                ", BothTeamScoreNo = " + cotes.BothTeamScoreNo + ""
            bool = true;
        }

        if (bool) {
            req = req + " WHERE game_id = " + obj1.GameID + "  and plateformename = '" + cotes.Plateforme + "'"
            //logger.info('DB : defining request : '+req)
            return req;
        } else {
            return null;
        }
    }


}