$(function(){
  function buildHTML(message){
    var html = `= render @messages
			    `
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.textbox').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
})

// $('messages').animate({scrollTop: $('messages')[0].scrollHeight}, 'fast');
// $("body").animate({scrollBottom:$('.messages').offset().top});
