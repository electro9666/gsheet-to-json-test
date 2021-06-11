const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();
console.log('process.env.SHEET_ID', process.env.SHEET_ID);
console.log('process.env.GOOGLE_API_KEY', process.env.GOOGLE_API_KEY);

const run = async () => {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log('sheet.title', sheet.title); // Sheet1

  const rows = await sheet.getRows();
  // console.log('rows.length', rows.length); // 5: 정확
  // console.log('rows[0]', rows[0]);
  // console.log('rows[0]', rows[0].code);
  // console.log('rows[0]', rows[0].ko);
  // console.log('rows[0]', rows[0].en);
  // console.log('rows[0]', rows[0].other);

  // custom
  const resultList = [];
  for (let i = 0, len = rows.length; i < len; i++) {
    resultList.push({
      code: rows[i].code,
      ko: rows[i].ko,
      en: rows[i].en,
      other: rows[i].other,
    });
  }
  console.log('resultList', resultList);
}

run();
