function enterText(text) {
  
  const MAX_PRIME_COUNT = 100
  const FIRST_DATE_ROW = 2
  const FIRST_DATE_COL = 3
  const MS_IN_HOUR = 60*60*1000

  const MAX_NICK_COUNT = 200
  const FIRST_NICK_ROW = 4
  const FIRST_NICK_COL = 1
  
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getActiveSheet()

  //Ввод
  const parts = Browser.inputBox('Введи дату').replace(/\./g,'-').split('-')
  const date = Date.parse(`${parts[2]}-${parts[1]}-${parts[0]}`) - 3 * MS_IN_HOUR
  
  const nicks = `${Browser.inputBox('Введи ники')}`.replace(/'\.\.\.'/g, '').split(' ')


  //Получение колонки даты
  const dateIndex = sheet.getRange(FIRST_DATE_ROW,FIRST_DATE_COL,1,MAX_PRIME_COUNT)
  .getValues()[0]
  .map(el => {
    try { return Date.parse(el) }
    catch (e) { return '0'}
  })
  .filter(el => !isNaN(el) && el != null && el != '0')
  .findIndex(el => date == el)

  if (dateIndex < 0) return
  if (nicks == 0) return 

  const date_col = dateIndex + FIRST_DATE_COL

  // Получение количества людей в ги

  const allNicks = sheet.getRange(FIRST_NICK_ROW,FIRST_NICK_COL,MAX_NICK_COUNT)
  .getValues()
  .map((el) => el[0])
  .filter(el => !!el)

  
  const isOnPrimeArray = allNicks.map(allNicksEl => {
    const index = nicks.findIndex(nicksEl => {
      return allNicksEl.search(nicksEl) == 0
    })

    return index == -1 ? ['0'] : ['1']
  })

  const primeRange = sheet.getRange(FIRST_NICK_ROW,date_col,allNicks.length)
  primeRange.setValues(isOnPrimeArray)

}
