let moment = require('moment');
let schedule = require('node-schedule');

let collectScheduledGamed = require('./scrappers/oddsPortal.scrapper').collectScheduledGamed()
let ii = schedule.scheduleJob('00 10 * * *', function(fireDate) {

    let date = new Date(moment().get('year'), moment().get('month'), moment().get('date'));
    mainCollectOdds(date);

});


async function mainCollectOdds(date) {
    let originalDate = new Date(date.getTime());
    for (let day = 1; day < 7; day++) {
        //start collect of yesterday
        i=day-2;
        //getting scheduled games for next i day
        //no collecting after 22h
        if(moment().get('hour') < 22){
            let nextDay = new Date( originalDate.getTime() + i * 86400000 );
            await collectScheduledGamed(formatDate(nextDay)).then(res=>console.log(res));
        }
    }
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