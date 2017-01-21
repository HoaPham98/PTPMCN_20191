$(document).ready(function () {
    var table = $('#ordsTable').DataTable({
        "ajax" : {
            "url": "/waiter/get_orders?waiterId="+parseInt($('#waiterId').val()),
            "type": "POST"
        },
        serverSide: false,
        columns: [
            { "data": "id", "name": "id",  "title": "id", "visible": true},
            { "data": "opened", "name": "isOpened", "title": "isOpened"},
            { "data": "openedTimeStamp", "name": "openedTimeStamp", "title": "opened time"},
            { "data": "closedTimeStamp", "name": "closedTimeStamp", "title": "closedTimeStamp"},
            { "data": "table", "name": "table", "title": "table"},
            { "data": "dishesQuantity", "title": "dishes", "sortable": false},
            { "data": "totalSum", "title": "total", "sortable": false},
            { "data": "fulfilled", "name": "fulfilled", "title": "isFulfilled"},

            { "data": null, "sortable": false, "render": function(data){
                return '<a href="/edit_order?id=' + data.id + '"><input type="button" class="btn btn-default" value="Edit"/></a>';
            }
            },

            { "data": null, "sortable": false, "render": function(data){
                return '<a href="/delete_order?id=' + data.id + '"><input type="button" class="btn btn-default" value="Delete"/></a>';
            }
            },

            { "data": null, "sortable": false, "render": function(data){
                if (!data.fulfilled) {
                    return '<input type="button" class="btn btn-default" disabled="true" value="Close"/>';
                } else {
                    return '<a href="/close_order?id=' + data.id + '"><input type="button" class="btn btn-default" value="Close"/></a>';
                }

            }
            }
        ]
    });
});
