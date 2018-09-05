$(function() {

	var search_list = $("#user-search-result")
  var member_list = $(".chat-group-user-user")

   function appendUserList(user){
		var html = `</li><div class="chat-group-user clearfix">
			  		<p class="chat-group-user__name">${user.name}</p>
			  		<a class="user-search-add chat-group-user__btn search-add chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
					</div>
					`
		search_list.append(html);
	}


	function appendNoUser(){
		var html = `</li><div class="chat-group-user clearfix">
				       <p class="chat-group-user__name">一致するユーザーはいません</p>
				     </div>
		            `
	    search_list.append(html);
	}


	function appendMember(userIdName){
    var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${userIdName.userName}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userIdName.userId}" data-user-name="${userIdName.userName}">削除</a>
                  </div>`
      member_list.append(html);
    }

  $("#user-search-field").on("keyup", function() {
  	// e.preventDefault();
    var input = $("#user-search-field").val();
    // if (input !== " " ){
    // 	var inputs = input
    // }
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
          users.forEach(function(user){
          appendUserList(user);
          console.log(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("検索は失敗しました");
    })
  });
  $("#user-search-result").on('click',$(".chat-group-user__btn--add"),function(){
   
   var userIdName = $(".user-search-add").data();
   console.log(userIdName);
 
   // $(this).remove();
   appendMember(userIdName);
  })
  $(".chat-group-user-user").on('click',$("chat-group-user__btn"),function(){
   $(".chat-group-user").remove();
  })
});
