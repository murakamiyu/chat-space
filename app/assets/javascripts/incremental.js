$(function() {

	var search_list = "#user-search-result"

   function appendUserList(user){
		var html = `</li><div class="chat-group-user clearfix">
			  		<p class="chat-group-user__name">${user.name}</p>
			  		<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
					</div>
					`
		search_list.append(html);
	}

  $("#user-search-field").on("keyup", function(e) {
  	e.preventDefault();
    var input = $("#user-search-field").val();
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
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("検索は失敗しました");
    });
  });
});