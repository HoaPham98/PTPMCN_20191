// Set up an empty Order table
$(document).ready(function () {
    var t = $('#odTable').DataTable({
        bLengthChange: false,
        columnDefs: [
            {targets: [0], visible: false},
            {targets: '_all', visible: true}
        ]
    });

    // Remove a selected dish from order
    $('#odTable tbody').on('click', 'button', function () {
        t.row($(this).parents('tr')).remove().draw();
    });
});

// Set up tables
$(document).ready(function () {
    $.ajax({
        type: "POST",
        data: null,
        url: '/waiter/get_tables',
        dataType: 'json',
        success: function (json) {
            var $el = $("#table");
            $el.empty();
            $.each(json, function (value, key) {
                $el.append($("<option></option>")
                    .attr("value", value).text(key));
            });
        }
    });
});

// Set up a Dish table in modal window
$(document).ready(function () {
    var table = $('#dTable').DataTable({
        "ajax": {
            "url": "/waiter/get_dishes",
            "type": "POST",
            "dataType": "json"
        },
        // TODO
        serverSide: false,
        columns: [
            {"data": "id", "visible": false, "searchable": false},
            {"data": "name"},
            {"data": "category"},
            {"data": "price"},
            {"data": "weight"},
            {"data": null, "defaultContent": "<button>Add</button>"}
        ]
    });

    // Adds a selected dish to the order
    $('#dTable tbody').on('click', 'button', function () {
        var data = table.row($(this).parents('tr')).data();
        var t = $('#odTable').DataTable();
        t.row.add([
            data.id,
            data.name,
            '<input type="text" value = "1" size = "2" name="input" onchange="alert(\'' + data.price + '\')"/>',
            data.price,
            '<button type="button" class="btn btn-default" id="delRow" name ="delRow">Del</button>'
        ]).draw(true);
    });
});

// Submits data to the server
$(document).ready(function () {
    $('#newOrderForm').submit(function (event) {
        var order = new Object();
        order.id = 0;
        order.openedTimeStamp = new Date();
        order.table = $('#table').val();
        order.waiter = $('#waiterId').val();
        order.dishes = getDishes();
        $.ajax({
            url: "/waiter/edit_order",
            dataType: 'json',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(order),
            success: function (data) {
                console.log("Success");
                location.href = '/waiter/orders/today';
            },
            error: function (e) {
                console.log("ERROR: ", e);
                display(e);
            },
            done: function (e) {
                console.log("DONE");
            }
        });
        event.preventDefault();
    });

    // Prepares a dish array object as a part of data to be sent to the server
    function getDishes() {
        var odTable = $('#odTable').DataTable();
        var dishes = [];
        //<![CDATA[
        var dishIdArray = odTable
            .columns(0)
            .data()
            .eq(0)
            .toArray();
        var quantityString = odTable
            .columns(2)
            .data()
            .eq(0)
            .$('input')
            .serialize();
        var quantityArray = quantityString.split("&");
        var len = dishIdArray.length;
        for (var i = 0; i < len; i++) {
            dishes.push({
                dishId: dishIdArray[i],
                quantity: parseInt(quantityArray[i]
                    .slice(6))
            });
        }
        //]]>
        return dishes;
    }

    // Displays the server's feedback on the page
    function display(data) {
        var json = "<h4>Error</h4><pre>"
            + data.responseText + "</pre>";
        $('#feedback').html(json);
    }
});

// Makes the modal window draggable
$(document).ready(function () {
    $("#myModal").draggable({
        handle: ".modal-header"
    })
});