$(function(){
    //$('div#div_521').html('xxx');
    $.get('/right/leftInformation', function(data){
        if(data.msg){
            $('div#div_hostname').html(data.info.hostname);
            $('div#platform').html(data.info.platform);
            $('div#CPU').html(data.info.arch);
        }
        else{
            alert('出现异常了');
        }
    });

    $(function() {
    var container = $("#flot-line-chart-moving");
    var maximum = container.outerWidth() / 2 || 300;
    var data = [];

    function getRandomData() {
        if (data.length) {
            data = data.slice(1);
        }
        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
        return res;
    }
    series = [{
        data: getRandomData(),
        lines: {
            fill: true
        }
    }];
    var plot = $.plot(container, series, {
        grid: {

            color: "#999999",
            tickColor: "#f7f9fb",
            borderWidth:0,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#ffffff", "#ffffff"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "#fff"
                    });
                }
                return markings;
            }
        },
        colors: ["#4fc5ea"],
        xaxis: {
            tickFormatter: function() {
                return "";
            }
        },
        yaxis: {
            min: 0,
            max: 110
        },
        legend: {
            show: true
        }
    });

    // Update the random dataset at 25FPS for a smoothly-animating chart

    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);
});
})