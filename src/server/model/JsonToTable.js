reportToTable = (data) => {
  if(data === undefined || data.length == 0) {
    return 'Your search returned no data';
  }else{
    var table = '<div>Table header</div><div>';
    for (var i = 0; i < data.length; i++) {
      table += data[i].join('</div><div>');
    }  
    table += table.concat('</div>');
    return table;
  }
}

  module.exports = {reportToTable};