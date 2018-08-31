$(function(){
  function buildHTML(message){
    var html = `<div class="message">
    			    <div class="upper-message__user-name">
				      ${message.name}
				    </div>
				    <div class="upper-message__date">
				      ${message.created_at.strftime('%Y/%m/%d %H:%M')}
				    </div>
				  	<div class="lower-meesage" >
				      ${message.content}
				    </div>
				    <div class="lower-message__image">
				      ${message.image}
				    </div>
    			</div>
			    `
    return html;
  }

  $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
  
  $('#new_message').on('submit', function(e){
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
    })
    .fail(function(){
      alert('error');
    })
  })
})
