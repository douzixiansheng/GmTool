/**-----------------逻辑处理---------------- */

$(document).ready(function () {
    /**---------dataTables 初始化数据 */
    //initEditTable();
    var data = [
        ['1001', '三体', '刘慈欣', '39.00', '重庆出版社', '982513213516'],
        ['2001', '三体', '周二狗', '39.00', '重庆出版社', '982513213516'],
    ]
    var oTable = $('#editable').dataTable({
        "data":data,
        "jQueryUI": true,
        "pagingType": "full_numbers",
        "bSort": true,
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sSearching":true,//支持本地查询
            "bProcessing":true,//
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            // 排序方式
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    });
    oTable.$('tr').click(function(){
        var data = oTable.fnGetData(this);
        //alert(data);

        /**选择单行 */
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            oTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        alert(data);
    });

    //$('#myModal').modal({backgrop:'static'});

    /**初始化并配置编辑器 */
    $('.summernote').summernote({
        lang: 'zh-CN',
        placeholder :'请输入文章内容',
        toolbar:[
            ['style',['bold','italic','underline','clear']],
            ['fontsize',['fontsize']],
            ['para',['ul','ol','paragraph']],
            ['color',['color']]
        ],
        height: 300,
        minHeight: null,
        maxHeight: null,
        focus: true
    });

    //赋值
    var markupStr = 'hello world';
    $('.summernote').code(markupStr);

    取值
    //var sHTML = $('.summernote').code();



    
});

function noticeSelect(){
    let myselect = document.getElementById('notice_select');
    let index = myselect.selectedIndex;
    alert('index '+index);
    var markupStr = 'hello world2';
    $('.summernote').code(markupStr);
}

function addGroup(){
   $('#myModalLabel').text('新增');
   $('#myModal').modal("show").css({width:'auto'});

   $.get('testRouter',{},function(){
       alert('测试成功')
   })
}

function editGroup(){
    $('#myModalLabel').text('编辑');
    $('#editModal').modal('show');
}

function noticeGroup(){
    $('#noticeModalLabel').text('公告');
    $('#noticeModal').modal('show');
}

function selectGroupTag(){
   alert("点击显示渠道并且关闭下层面板");
   $('#myModal2').modal();
   $('#myModal').modal("hide");
   var html = '';
   html += '<div class="checkbox">'
    //html += '<label class="label label-info" data-togger="tooltip" >';
   let arr = ['苹果','线上测试服_苹果','安卓','OPPO','拇指玩','有狼'];
   for(let i in arr){
       html += ''+
        '<label><input type="checkbox" class="i-checks">'+arr[i]+'&nbsp;&nbsp;</label>';
   }

   html += '</div></div>';
   $('#channel_panel').html(html);

   $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green'
   });
}

function initEditTable(){
    var html = "";
    for(let i = 0; i < 50; i++){
        html += '<tr> <td>Trident</td><td>Internet Explorer 4.0'+
        '</td><td>Win 95+</td><td class="center">4</td><td class="center">X</td><td>xxx</td></tr>'
    }

    //alert(html);
    $('tbody#tEditTab').html(html);
}