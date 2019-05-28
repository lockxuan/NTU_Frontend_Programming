// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()
    $('.foot').hide();
    $('#carouselExampleIndicators').hide();
    $('#it_list').hide();
    $('#navbar').hide();

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        if (page == last_page) {
            var end = start + last_item - 1
        } else {
            var end = start + pageCount - 1
        }
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    $('.logo').click(function() {
        location.reload();
    })

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'items').append($img).append($h3).append($p)
        $col = $('<col>').attr('href', '#').append($item)

        $ccol = $col.attr('data-toggle', 'modal').attr('data-target', '#exampleModalCenter');

        $('#product-list').append($ccol)



        $ccol.click(function() {
            $('.buy').empty()
            $('.buy').append($('<img>').attr('src', item.image).attr('class', 'imgsize'))
            $('.buy').append($('<div>').attr('class', 'abcd'))
            $('.abcd').append($('<p>').text("商品 : " + item.name))
            $('.abcd').append($('<p>').text('NT$ : ' + item.price))
            $('.abcd').append($('<div>').addClass('row efgh'))
            $('.efgh').append($('<p>').text("數量 : "))
            $sel = $('<select>').attr('class', 'selectpicker').append($('<option>').text("1").attr('value', '1')).append($('<option>').text("2").attr('value', '2')).append($('<option>').text("3").attr('value', '3')).append($('<option>').text("4").attr('value', '4')).append($('<option>').text("5").attr('value', '5'))
            $('.efgh').append($sel)
        })
    }

    var last_item;
    var last_page;
    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum
        last_item = (n - (Math.floor(pageNum - 1) * 20))
        last_page = (Math.floor(pageNum))
        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)
        $('#page-number').append($lli)
        $lli.click(function() {
            for (var i = 2; i < pageNum; i++) {
                if ($('.p' + i).hasClass('active')) {
                    $('.p' + (i - 1)).addClass('active')
                    $('.p' + i).removeClass('active')
                    showItems(Number(i) - 1)
                    $rli.removeClass('disabled')
                    if (i == 2) {
                        $lli.addClass('disabled')
                    }
                    break;
                }
            }
        })

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)



            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $llli = $li.addClass('p' + i);
            $('#page-number').append($llli)

            $llli.on('click', function() {
                var i = $(this).text()
                if (i == 1) {
                    $lli.addClass('disabled')
                } else if (i == last_page) {
                    $rli.addClass('disabled')
                } else {
                    $rli.removeClass('disabled')
                    $lli.removeClass('disabled')
                }

                if ($('.page-item').hasClass('active')) {
                    $('.page-item').removeClass('active')
                }
                $('.p' + i).addClass('active');
                showItems(Number(i))

            })
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
        $rli.click(function() {
            for (var i = 1; i < last_page; i++) {
                if ($('.p' + i).hasClass('active')) {
                    $('.p' + (i + 1)).addClass('active')
                    $('.p' + i).removeClass('active')
                    $lli.removeClass('disabled')
                    showItems(Number(i) + 1)
                    if (i == (last_page - 1)) {
                        $rli.addClass('disabled')
                    }
                    break;
                }
            }
        })
    }

    $('#query').on('click', function() {
        $('.first').hide();
        $('.qu').hide();
        $('#carouselExampleIndicators').show().addClass('animated fadeIn');
        $('.foot').show();
        $('#it_list').show();
        $('.container').addClass('animated fadeIn');
        $('#navbar').show();
        $.get('https://js.kchen.club/B05505051/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })


    $('.btn_add').on('click', function() {

        // 取得商品資料
        var data = {
            item: {
                name: $('#inputProductName').val(),
                price: Number($('#inputProductPrice').val()),
                count: +$('#inputProductCount').val(),
                image: $('#inputProductImage').val(),
            }
        }

        // 新增商品
        $.post('https://js.kchen.club/B05505051/insert', data, function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    //$('#message').text('新增成功')
                    alert("新增成功")
                    location.reload();
                    console.log(response.item)
                        //$('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')
                    console.log(response.message)
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        })

    })
})