// Events start
$("#btnSaveItem").click(function () {
    saveItem();
    clearItemAll();
    loadAllItem();
});

// search item
$("#btnsearchItem").click(function () {
    var searchItemID = $("#txtSearchItem").val();

    var response = searchItem(searchItemID);
    if (response) {
        $("#itemCode").val(response.code);
        $("#itemName").val(response.name);
        $("#itemQty").val(response.qnty);
        $("#itemPrice").val(response.price);
    }else{
        clearItemAll();
        alert("No Such a Item");
    }
});

// Events end


// CRUD OPERATIONS START
function loadAllItem() {
    $("#tblItem").empty();
    for (var i of itemDB) {
        /*create a html row*/
        let row = `<tr><td>${i.code}</td><td>${i.name}</td><td>${i.qnty}</td><td>${i.price}</td></tr>`;
        /*select the table body and append the row */
        $("#tblItem").append(row);
    }
}

function saveItem() {
    //gather customer information
    let itemID = $("#itemCode").val();
    let itemName= $("#itemName").val();
    let itemQnty = $("#itemQty").val();
    let itemPrice = $("#itemPrice").val();

    //create Object
    var itemObject = {
        code: itemID,
        name: itemName,
        qnty: itemQnty,
        price:itemPrice
    };

    itemDB.push(itemObject);
}

function searchItem(id) {
    for (let i = 0; i <itemDB.length; i++) {
        if (itemDB[i].code == id) {
            return itemDB[i];
        }
    }
}

function deleteCustomer(){
    //write the code
}

function updateCustomer(){
    //write the code
}

// CRUD OPERATIONS ENDED


//validation started
// customer regular expressions
const regExItemID=/^(I00-)[0-9]{3,4}$/;
const itemNameRegEx = /^[A-z]{1,20}$/;
const itemUnitPriceRegEx = /^[0-9]{2,8}$/;
const itemQTYOnHand = /^[0-9]{1,10}$/;


$('#itemCode,#itemName,#itemQty,#itemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#itemCode,#itemName,#itemQty,#itemPrice').on('blur', function () {
    formItemValid();
});

//focusing events
$("#itemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#itemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#itemQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});

$("#itemPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfItemValid();
    }
});
// focusing events end
$("#btnSaveItem").attr('disabled', true);

function clearItemAll() {
    $('#itemCode,#itemName,#itemQty,#itemPrice').val("");
    $('#itemCode,#itemName,#itemQty,#itemPrice').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#btnSaveItem").attr('disabled', true);
    loadAllItem();
}

function formItemValid() {
    var itemId = $("#itemCode").val();
    $("#itemCode").css('border', '2px solid green');

    if (regExItemID.test(itemId)) {
        var ItemName = $("#itemName").val();
        if (itemNameRegEx .test(ItemName)) {
            $("#itemName").css('border', '2px solid green');
            var ItemQty = $("#itemQty").val();
            if (itemQTYOnHand .test(ItemQty)) {
                var ItemPrice = $("#itemPrice").val();
                var resp = itemUnitPriceRegEx.test(ItemPrice);
                $("#itemQty").css('border', '2px solid green');
                if (resp) {
                    $("#itemPrice").css('border', '2px solid green');
                    return true;
                } else {
                    $("#itemPrice").css('border', '2px solid red');
                    return false;
                }
            } else {
                $("#itemQty").css('border', '2px solid red');
                return false;
            }
        } else {
            $("#itemName").css('border', '2px solid red');
            return false;
        }
    } else {
        $("#itemCode").css('border', '2px solid red');
        return false;
    }
}

function checkIfItemValid() {
    var ItemCode = $("#itemCode").val();
    if (regExItemID.test(ItemCode)) {
        $("#itemName").focus();
        var ItemName = $("#itemName").val();
        if (itemNameRegEx.test(ItemName)) {
            $("#itemQty").focus();
            var ItemQty = $("#itemQty").val();
            if (itemQTYOnHand.test(ItemQty)) {
                $("#itemPrice").focus();
                var ItemPrice = $("#itemPrice").val();
                var resp = itemUnitPriceRegEx.test(ItemPrice);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#itemPrice").focus();
                }
            } else {
                $("#itemQty").focus();
            }
        } else {
            $("#itemName").focus();
        }
    } else {
        $("#itemCode").focus();
    }
}

function setButtonS() {
    let b = formValid();
    if (b) {
        $("#btnSaveItem").attr('disabled', false);
    } else {
        $("#btnSaveItem").attr('disabled', true);
    }
}

$('#btnSaveItem').click(function () {
    checkIfValid();
});
//validation ended