$(document).ready(function (){
    initTableCreation();
});

//Table building
function initTableCreation() {
    getDataFromApi('https://jsonplaceholder.typicode.com/users');

}

function getDataFromApi(url) {
    $.get(url, function(response){       
        iterateThroughResponse(sliceArray(response)[0]);
        setCheckAllListener('input.select-check-all');
        setNextListener(response, 'button#next');
        setSearchListener(response, 'button.table-search');
    }
)};

function iterateThroughResponse(response) {
    response.map(function(item) {
        appendDataToTable('tbody.data-table', item);
    });
}

function appendDataToTable(selector, item) {
    $(selector).append(createTableRow(item));
}

function createTableRow(item) {
    return '<tr>'+    
               '<th>' + 
                    '<div class="form-check">'+
                        '<input class="tr-check" type="checkbox" value="">'+
                    '</div>'+
                '</th>'+ 
                '<th>'+item.id + '</th>'+
                '<td>'+ item.name +'</td>'+
                '<td>'+ item.username + '</td>'+
                '<td>'+ item.email + '</td>'+ 
            '</tr> ' 
}

//Check All functionality
function setCheckAllListener(selector) {
    $(selector).click(function() {
        processChecking('input.select-check-all', 'input.tr-check');        
    });
}

function processChecking(headCheckSelector, rowCheckSelector) {
    $(rowCheckSelector).each(function(i, el) {
        if($(headCheckSelector).is(':checked')) {
            $(el).attr("checked", "checked");
        } else {
            $(el).removeAttr("checked");
        }        
    });
}
//Load Next functionality
function sliceArray(response) {
    var joinedSlicedArray = [];
    var size = 4;
    for (var i = 0; i < response.length; i += size) {
        var slicedArray = response.slice(i, i + size);
        joinedSlicedArray.push(slicedArray);
    }
    return joinedSlicedArray;
}

function setNextListener(response, selector) {
    var iterator = 1;
    $(selector).click(function () {
        iterateThroughResponse(sliceArray(response)[iterator]);
         if (iterator < sliceArray(response).length) {
            iterator++;
                if(iterator == sliceArray(response).length) {
                    $(selector).unbind('click');
                    $(selector).text('End');
                    
                }
        } 
           
    });
}

//Search functionality
function setSearchListener(response, selector) {
    $(selector).click(function() {
        startSearch(response);
    });
}

function startSearch(response) {
    $('table.table').show();
    $('h1.no-results-message').remove();
    var searchTerm = $('input#search').val();
    if (searchTerm == '') {
        iterateThroughResponse(response);
    }
    var filteredResponse = response.filter(function(item) {
        //console.log(searchTerm);
        
        return  item.name.search(searchTerm) >=0
            ||  item.username.search(searchTerm) >=0
            ||  item.email.search(searchTerm) >=0
        
    });
    $('tbody.data-table').html('');
    if (filteredResponse.length == 0) {
        $('table.table').after('<h1 class="no-results-message" style="text-align: center">No results to show!</h1>');
        $('table.table').hide();

    } 
    iterateThroughResponse(filteredResponse);
    

    
}
