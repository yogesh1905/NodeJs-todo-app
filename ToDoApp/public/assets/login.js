
$(document).ready(function(){
    $('form').on('submit', function(){ // when submit button is pressed a request to /login url is made which is handled by the todoController file
      var info={error: 'false', username: $('#foo').val(), password: $('#bar').val()};
      $.ajax({
        type: 'POST',
        url: '/login',
        data: info,
        datatype: 'json',
        success: function(result){
              alert('ajax request completed');
              if(result.error === 'false'){
                var str = '/todo/' + result.username;
                document.location.assign(str);
              }
              else
              {
                alert("Invalid Username");
                document.location.assign('/login');
              }
        
        }
          

      });
      
    });
      return true;
});






