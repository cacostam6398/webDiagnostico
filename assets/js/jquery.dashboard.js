! function(o) {
    "use strict";
    var a = function() {
        this.$body = o("body"), this.charts = []
    };
    a.prototype.respChart = function(a, r, e, t) {
        var n = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function() {
            n.apply(this, arguments);
            var o = this.chart.chart.ctx,
                a = o.stroke;
            o.stroke = function() {
                o.save(), o.shadowColor = "#aaa", o.shadowBlur = 10, o.shadowOffsetX = 0, o.shadowOffsetY = 4, a.apply(this, arguments), o.restore()
            }
        };
        var i = a.get(0).getContext("2d"),
            s = o(a).parent();
        return function() {
            var n;
            switch (a.attr("width", o(s).width()), r) {
                case "Line":
                    n = new Chart(i, {
                        type: "line",
                        data: e,
                        options: t
                    });
                    break;
                case "Doughnut":
                    n = new Chart(i, {
                        type: "doughnut",
                        data: e,
                        options: t
                    });
                    break;
                case "Pie":
                    n = new Chart(i, {
                        type: "pie",
                        data: e,
                        options: t
                    });
                    break;
                case "Bar":
                    n = new Chart(i, {
                        type: "bar",
                        data: e,
                        options: t
                    });
                    break;
                case "Radar":
                    n = new Chart(i, {
                        type: "radar",
                        data: e,
                        options: t
                    });
                    break;
                case "PolarArea":
                    n = new Chart(i, {
                        data: e,
                        type: "polarArea",
                        options: t
                    })
            }
            return n
        }()
    }
    
   , o.Dashboard = new a, o.Dashboard.Constructor = a
}(window.jQuery),
function(o) {
    "use strict";

}();