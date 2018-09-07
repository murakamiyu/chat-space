$(function(){

   function buildHTML(message){


 　 var image = "";
        image = (message.image.url) ? `<img class="lower-message__image" src="${message.image.url}">` : "";

    var html =`<div class="message" data-message-id="${message.id}">
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

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  
    $.ajax({
      url: location.href,
      dataType: 'json'
    })
    .done(function(json) {
      var id = $('.message:last').data('messageId');
      var insertHTML ='';
      // console.log(id);
      
      json.messages.forEach(function(message){
        if( message.id  > id ){
          insertHTML += buildHTML(message);
        }
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
      });
      $('.messages').append(insertHTML);
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }}, 5 * 1000 );
  
  });