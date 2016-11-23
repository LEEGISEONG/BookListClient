
//도서 리스트 검색
function searchBook(){

    if(event.keyCode == 13){

        keyword = $("#keyword").val();
        $.ajax({
            url : "http://localhost:7070/book/bookList",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data : {
                keyword : keyword,
                start : 0

            },
            success : function(data){

                $("tbody").empty();

                for(var i = 0 ; i < data.length ; i++) {

                    var tr = $("<tr></tr>").attr("data-isbn", data[i].isbn);
                    tr.attr("idx", i);

                    var img = $("<img width='145' height='199' />").attr("src", data[i].img);
                    var imgTd = $("<td></td>").append(img);
                    var titleTd = $("<td></td>").text(data[i].title);
                    var authorTd = $("<td></td>").text(data[i].author);
                    var priceTd = $("<td></td>").text(data[i].price);
                    var bisbn = $("<td></td>").text(data[i].bisbn);
                    var comTd = $("<td></td>");

                    var delBtn = $("<input class='btn btn-default'>");
                    delBtn.attr("type", "button");
                    delBtn.attr("value", "삭제");
                    delBtn.attr("id", "delBtn");

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(bisbn);
                    tr.append(priceTd);
                    tr.append(authorTd);
                    tr.append(delBtn);

                    $("tbody").append(tr);
                }

            },
            error :function(){
                alert("코드가 이상해요~~~");
            }
        });

    }
}

//삭제 버튼
$(document).on('click', '#delBtn', function() {

    var isbn = $(this).parent().attr("data-isbn");

    var delpoint = $(this).parent();

    $.ajax({
        url : "http://localhost:7070/book/deleteBook",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            isbn : isbn
        },
        success : function(result){

            delpoint.remove();

        },
        error : function() {
            alert("코드가 이상해요~~~");
        }
    });
});

