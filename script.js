(function ($) {
    $(document).ready(function () {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        var polygon = {
            fillStyle: "",
            draw: function (c, p1, p2, p3, p4, p5, p6, p7, p8) {
                if (typeof p1 === "object") {
                    c.fillStyle = this.fillStyle;
                    c.beginPath();
                    c.moveTo(p1[0][0], p1[0][1]);
                    for (var i = 1; i < p1.length; i++) {
                        context.lineTo(p1[i][0], p1[i][1]);
                    }
                    c.closePath();
                    c.fill();
                } else {
                    c.fillStyle = this.fillStyle;
                    c.beginPath();
                    c.moveTo(p1, p2);
                    c.lineTo(p3, p4);
                    c.lineTo(p5, p6);
                    c.lineTo(p7, p8);
                    c.closePath();
                    c.fill();
                }
            }
        }

        var Stephenator = {
            default_colors:["#dcdadd", "#2290c1", "#ddac2c", "#421f35", "#e5702d", "#16205b", "#26863e", "#df4634", "#1288b6", "#282826", "#316654"],
            props: {
                set_position_x: 0,
                set_position_y: 0,
                set_width: canvas.width,
                set_height: canvas.height,
                set_matrix: 5,
                set_square_division: 10,
                set_square_colors: [["#dcdadd", "#2290c1", "#ddac2c", "#421f35", "#e5702d", "#16205b", "#26863e", "#df4634", "#1288b6", "#282826", "#316654"]]
            },
            drawSet: function () {
                var square_width = this.props.set_width / this.props.set_matrix;
                var square_height = this.props.set_height / this.props.set_matrix;
                var color_set = this.props.set_square_colors;
                var current_set = 0;
                var d = "right";
                for (var i = 0; i < this.props.set_matrix; i++) {
                    for (var j = 0; j < this.props.set_matrix; j++) {
                        Stephenator.diagonallyStripedSquare(this.props.set_position_x + (square_width * j), this.props.set_position_y + (square_height * i), square_width, square_height, this.props.set_square_division, d, color_set[current_set]);
                        d = (d === "left") ? "right" : "left";
                        current_set = (current_set + 1 < color_set.length) ? current_set + 1 : 0;
                    }
                    if (this.props.set_matrix % 2 == 0) {
                        d = (d === "left") ? "right" : "left";
                    }
                }
            },
            diagonallyStripedSquare: function (x, y, w, h, n, d, c) {
                //Largura horizontal e vertical de cada listra
                var distance_w = (w * 2) / n;
                var distance_h = (h * 2) / n;
                //Metada da largura horizontal e vertical de cada listra
                var half_distance_w = ((w * 2) / n) / 2;
                var half_distance_h = ((h * 2) / n) / 2;
                //Variáveis de controle
                var i, fill_index = 0;

                //Verifica se o número total de listras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da listra central
                if (n % 2 > 0) {
                    var half = (n - 1) / 2;
                    for (i = 0; i < half; i++) {
                        polygon.fillStyle = c[fill_index];
                        if (d === "left") {
                            polygon.draw(context, x, y + h - (distance_h * i), x + (distance_w * i), y + h, x + (distance_w * (i + 1)), y + h, x, y + h - (distance_h * (i + 1)));
                        } else {
                            polygon.draw(context, x, y + (distance_h * i), x + (distance_w * i), y, x + (distance_w * (i + 1)), y, x, y + (distance_h * (i + 1)));
                        }
                        fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                    }
                    //Desenho da listra central
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x, y + half_distance_h, x + w - half_distance_w, y + h, x + w, y + h, x, y);
                        polygon.draw(context, x, y, x + w, y + h, x + w, y + h - half_distance_h, x + half_distance_w, y);
                    } else {
                        polygon.draw(context, x, y + (h - half_distance_h), x + (w - half_distance_w), y, x + w, y, x, y + h);
                        polygon.draw(context, x, y + h, x + w, y, x + w, y + half_distance_h, x + half_distance_w, y + h);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;

                    for (i = 0; i < half; i++) {
                        polygon.fillStyle = c[fill_index];
                        if (d === "left") {
                            polygon.draw(context, x + (distance_w * i) + half_distance_w, y, x + w, y + h - (distance_h * i) - half_distance_h, x + w, y + h - (distance_h * (i + 1)) - half_distance_h, x + (distance_w * (i + 1)) + half_distance_w, y);
                        } else {
                            polygon.draw(context, x + (distance_w * i) + half_distance_w, y + h, x + w, y + (distance_h * i) + half_distance_h, x + w, y + (distance_h * (i + 1)) + half_distance_h, x + (distance_w * (i + 1)) + half_distance_w, y + h);
                        }
                        fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                    }
                    //Caso o número de listras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de listras pela metade
                } else {
                    for (i = 0; i < n / 2; i++) {
                        polygon.fillStyle = c[fill_index];
                        if (d == "left") {
                            polygon.draw(context, x, y + h - (distance_h * i), x + (distance_w * i), y + h, x + (distance_w * (i + 1)), y + h, x, y + h - (distance_h * (i + 1)));
                        } else {
                            polygon.draw(context, x, y + (distance_h * i), x + (distance_w * i), y, x + (distance_w * (i + 1)), y, x, y + (distance_h * (i + 1)));
                        }
                        fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                    }
                    for (i = 0; i < n / 2; i++) {
                        polygon.fillStyle = c[fill_index];
                        if (d === "left") {
                            polygon.draw(context, x + (distance_w * i), y, x + w, y + h - (distance_h * i), x + w, y + h - (distance_h * (i + 1)), x + (distance_w * (i + 1)), y);
                        } else {
                            polygon.draw(context, x + (distance_w * i), y + h, x + w, y + (distance_h * i), x + w, y + (distance_h * (i + 1)), x + (distance_w * (i + 1)), y + h);
                        }
                        fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                    }
                }
            }
        }
        
        //Object to control canvas
        var CanvasDraw = {
            canvas:canvas,
            animated:false,
            playAnimation:function() {
                this.animated = true;
                this.draw(this.canvas);
            },
            stopAnimation:function() {
                this.animated = false;
            },
            draw: function () {
                //Clear canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
                //Update art properties
                Stephenator.props.set_width = canvas.width;
                Stephenator.props.set_height = canvas.height;
                //Draw it!
                Stephenator.drawSet(this.canvas);
                //If animated, replay
                if (CanvasDraw.animated) window.requestAnimationFrame(this.draw);
            }
        }
        
        //Covering background with canvas area
        $(window).resize(function (event) {
            $("#canvas-container").css({width:$(window).width(),height:$(window).height()});
            if ($(window).width() > $(window).height()) {
                $("#canvas").attr("width", $(window).width());
                $("#canvas").attr("height", $(window).width());
            } else {
                $("#canvas").attr("width", $(window).height());
                $("#canvas").attr("height", $(window).height());
            }
            //Redraw canvas
            CanvasDraw.draw();
        }).resize();
        
        //Updating properties
        $("#set_matrix").change(function() {
            Stephenator.props.set_matrix = $(this).val();
            CanvasDraw.draw();
        });
        $("#set_square_division").change(function() {
            Stephenator.props.set_square_division = $(this).val();
            CanvasDraw.draw();
        });
        //Creating colors set
        function updateSet() {
            
            var htmlItem = "";
            var htmlDefOptions = "";
            var htmlCurOptions = "";
            var i;
            
            for (i = 0; i<Stephenator.default_colors.length; i++) {
                htmlDefOptions += '<option style="background:'+Stephenator.default_colors[i]+'" value="'+Stephenator.default_colors[i]+'">'+Stephenator.default_colors[i]+'</option>';
            }
            
            for (i = 0; i<Stephenator.props.set_square_colors.length; i++) {
                for (j = 0; j<Stephenator.props.set_square_colors[i].length; j++) {
                    htmlCurOptions += '<option style="background:'+Stephenator.props.set_square_colors[i][j]+'" value="'+j+'">'+Stephenator.props.set_square_colors[i][j]+'</option>';
                }
                htmlItem += '<li id="item-'+i+'">'+
                            '<select name="default-colors" class="def-colors">'+htmlDefOptions+'</select>'+
                            '<button class="add-color">Adicionar</button>'+
                            '<select name="default-colors" class="set-colors">'+htmlCurOptions+'</option>'+'</select>'+
                            '<button class="rem-color">Remover</button>'+
                            '</li>';
                htmlCurOptions = "";
            }
            
            $("#set-colors").html(htmlItem);
        }
        
        $("#add-set").click(function() {
            Stephenator.props.set_square_colors.push([Stephenator.default_colors[0]]);
            updateSet();
            CanvasDraw.draw();
        });
        
        $('#set-colors').delegate('button', 'click', function() {
            
            var set_id = parseInt($(this).parent().attr("id").replace("item-",""));
            var selected_item;
            
            switch ( $(this).attr("class") ) {
                case "add-color":
                    Stephenator.props.set_square_colors[set_id].push($('#item-'+set_id+' .def-colors').val());
                    break;
                case "rem-color":
                    console.log(Stephenator.props.set_square_colors[set_id].length);
                    if (Stephenator.props.set_square_colors[set_id].length>0) {   
                        selected_item = $("#item-"+set_id+" .set-colors").val();
                        Stephenator.props.set_square_colors[set_id].splice(selected_item, 1);
                    } else {
                        Stephenator.props.set_square_colors.splice(set_id, 1);
                    }
                    break;
            }
            
            updateSet();
            CanvasDraw.draw();
            
        });
        updateSet();
        
    });
})(jQuery);