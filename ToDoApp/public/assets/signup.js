
$(document).ready(function(){
    $('form').on('submit', function(){ // when submit button is pressed a request to /login url is made which is handled by the todoController file
      var info={error: 'false', username: $('#foo').val(), password: $('#bar').val()};
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: info,
        success: function(result){
              alert('ajax request completed');
              if(result.error === "false"){
                var str = '/todo/' + result.data.username;
                document.location.assign(str);
              }
              else
              {
                document.location.assign('/signup');
              }
        
            }
      
          
      });
        
      
    });
      return true;
});






