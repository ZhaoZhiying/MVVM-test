$('#addOne').on('click', function(){
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 + 1
    $('#number').text(newNumber)
  })
  $('#minusOne').on('click', function(){
    var oldNumber = $('#number').text()
    var newNumber = oldNumber - 0 - 1
    $('#number').text(newNumber)
  })
  $('#reset').on('click', function(){
    $('#number').text(0)
})