var api = function(){
    
    this.action = '';
    this.parameters = {};
    
    this.call = function(){
        var postData = {
            '_action': this.action,
            '_location': location.href
        };
        for(p in this.parameters) { // Add parameters to postData
            postData[p] = this.parameters[p]
        }
        console.log('postData', postData);
        var apiUrl = editorLoader.getPathToEditor() + '/php/editorApi.php';
        
        
        $.post(apiUrl, postData, function(data, textStatus){
            console.log('data',data);
            console.log('textStatus',textStatus);
        }, "json");
        
        /*
        $.ajax({
          type: 'POST',
          url: apiUrl,
          data: postData,
          success: function(data, textStatus){
              console.log('data',data);
              console.log('textStatus',textStatus);
          },
          dataType: 'json',
          async: false
        });
        */
        
    }
};