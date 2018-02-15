$(document).ready(function() {   

    $.get('https://jsonplaceholder.typicode.com/users', function(response){  
       // console.log(response);
        for (var i = 0; i < response.length; i++){ 

           $("tbody").append(createTableRow());
        // $("tbody").append(  $(document.createElement('input')).attr({type:'checkbox'})   );
            
         }

        function createTableRow(){
            return '<tr>'+    
                       '<th scope="row">' + 
                      '<div class="form-check">'+
                             ' <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">'+
                         ' </div></th>'+ 
                        '<th>'+response[i].id + '</th>'+
                        '<td>'+ response[i].name +'</td>'+
                        '<td>'+ response[i].username + '</td>'+
                        '<td>'+ response[i].email + '</td>'+ 
                    '</tr> ' 
        } 

    function selectAll(){
        $("#select").css("cursor", "pointer");
       var mySelect = $("#select").click(function(){

                if(mySelect){
                    $("input:checkbox").attr("checked", "checked");
                } else{
                    $("input:checkbox").removeAttr("checked");

                }
        })
 }
 selectAll();


        $("#next").click(function(){
            console.log("click");
        })

        
   });  
          
});

