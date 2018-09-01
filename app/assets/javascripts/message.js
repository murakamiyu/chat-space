$(function(){
  function buildHTML(message){
 　　　　　　var image = "";
  	image = (message.image) ? `<img class="lower-message__image" src="${message.image}">: ""; `
    var html = `<div class="message">
	　　　　　　　　　　　　　　　　　　<div class="upper-message">
    	　　　　　　　　　　　　　　　　　　　　　　<div class="upper-message__user-name">
		　　　　　　　　${message.name}
	　　　　　　　　　　　　　　　　　　　　　　　</div>
	　　　　　　　　　　　　　　　　　　　　　　　<div class="upper-message__date">
	　　　　　　　　　　　　　　　　　　　　　　　　　${message.created_at}
	　　　　　　　　　　　　　　　　　　　　　　　　</div>
	　　　　　　　　　　　　　　　　　　　　　　</div>
		　　　　　　<p class="lower-meesage__content" >
	　　　　　　　　　　　　　　　　　　　　　　　　　　${message.content}
		   </p>
	　　　　　　　　　　　　　　　　　　　　　　<div class="lower-message__image">
		　　　　　　　　　　${image}
                  　　</div>
    		</div>
		`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
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
      $('.form__message').prop("disabled", false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__message').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
