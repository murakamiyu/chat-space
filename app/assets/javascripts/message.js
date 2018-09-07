$(function(){
  function buildHTML(message){
 　 var image = "";
  	    image = (message.image.url) ? `<img class="lower-message__image" src="${message.image.url}">` : "";

    var html =`<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">${message.name}</div> 
                    <div class="upper-message__date">${message.created_at}</div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-meesage__content">${message.content}</p>
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
      console.log(data)
      $('.messages').append(html)
      $('.form__submit').prop("disabled", false)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast') 
    })
    .fail(function(){
      alert('error');
    });
  });
});
