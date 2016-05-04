
$(document).ready(function(){
        
    $(window).resize(function() {
        $("#canvas").width($(window).width());
        $("#canvas").height($(window).height());
    }).resize();

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var losangle = {
        fillStyle:"",
        draw:function(p1, p2, p3, p4, p5, p6, p7, p8) {
            if (typeof p1 === "object") {
                context.fillStyle = this.fillStyle;
                context.beginPath();
                context.moveTo(p1[0][0],p1[0][1]);
                for (var i = 1; i<p1.length; i++) {
                    context.lineTo(p1[i][0],p1[i][1]);
                }
                context.closePath();
                context.fill();
            } else {
                context.fillStyle = this.fillStyle;
                context.beginPath();
                context.moveTo(p1,p2);
                context.lineTo(p3,p4);
                context.lineTo(p5,p6);
                context.lineTo(p7,p8);
                context.closePath();
                context.fill();
            }
        }
    }

    var Stephenator = {
        props:{
            set_position_x:0,
            set_position_y:0,
            set_width:canvas.width,
            set_height:canvas.height,
            set_division:5,
            set_square_division:10,
            set_square_colors:[
                ["#dcdadd","#2290c1","#ddac2c","#421f35","#e5702d","#16205b","#26863e","#df4634","#1288b6","#282826","#316654"],
                ["#316654","#282826","#1288b6","#df4634","#26863e","#16205b","#e5702d","#421f35","#ddac2c","#2290c1","#dcdadd"],
            ]
        },
        drawSet:function() {
            var square_width = this.props.set_width/this.props.set_division;
            var square_height = this.props.set_height/this.props.set_division;
            var color_set = this.props.set_square_colors;
            var current_set = 0;
            var d = "right";
            for (var i = 0; i < this.props.set_division; i++) {
                for (var j = 0; j < this.props.set_division; j++) {
                    Stephenator.diagonallyStripedSquare(this.props.set_position_x+(square_width*j), this.props.set_position_y+(square_height*i), square_width, square_height, this.props.set_square_division, d, color_set[current_set]);
                    d = (d==="left") ? "right" : "left";
                    current_set = (current_set+1<color_set.length) ? current_set+1 : 0 ;
                }
                if ( this.props.set_division % 2 == 0 ) {
                    d = (d==="left") ? "right" : "left";
                }
            }
        },
        diagonallyStripedSquare:function(x,y,w,h,n,d,c) {
            //Largura horizontal e vertical de cada listra
            var distance_w = (w*2)/n;
            var distance_h = (h*2)/n;
            //Metada da largura horizontal e vertical de cada listra
            var half_distance_w = ((w*2)/n)/2;
            var half_distance_h = ((h*2)/n)/2;
            //Variáveis de controle
            var i, fill_index = 0;

            //Verifica se o número total de listras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da listra central
            if (n%2>0) {
                var half = (n-1)/2;
                for (i=0; i<half; i++) {
                    losangle.fillStyle = c[fill_index];
                    if (d==="left") {
                        losangle.draw(x, y+h-(distance_h*i), x+(distance_w*i), y+h, x+(distance_w*(i+1)), y+h, x, y+h-(distance_h*(i+1)));
                    } else {
                        losangle.draw(x, y+(distance_h*i), x+(distance_w*i), y, x+(distance_w*(i+1)), y, x, y+(distance_h*(i+1)));
                    }
                    fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
                }
                //Desenho da listra central
                losangle.fillStyle = c[fill_index];
                if (d==="left") {
                    losangle.draw(x, y+half_distance_h, x+w-half_distance_w, y+h, x+w, y+h, x, y);
                    losangle.draw(x, y, x+w, y+h, x+w, y+h-half_distance_h, x+half_distance_w, y);
                } else {
                    losangle.draw(x, y+(h-half_distance_h), x+(w-half_distance_w), y, x+w, y, x, y+h);
                    losangle.draw(x, y+h, x+w, y, x+w, y+half_distance_h, x+half_distance_w, y+h);
                }
                fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;

                for (i=0; i<half; i++) {
                    losangle.fillStyle = c[fill_index];
                    if (d==="left") {
                        losangle.draw(x+(distance_w*i)+half_distance_w, y, x+w, y+h-(distance_h*i)-half_distance_h, x+w, y+h-(distance_h*(i+1))-half_distance_h, x+(distance_w*(i+1))+half_distance_w, y);
                    } else {
                        losangle.draw(x+(distance_w*i)+half_distance_w, y+h, x+w, y+(distance_h*i)+half_distance_h, x+w, y+(distance_h*(i+1))+half_distance_h, x+(distance_w*(i+1))+half_distance_w, y+h);
                    }
                    fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
                }
            //Caso o número de listras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de listras pela metade
            } else {
                for (i=0; i<n/2; i++) {
                    losangle.fillStyle = c[fill_index];
                    if (d=="left") {
                        losangle.draw(x, y+h-(distance_h*i), x+(distance_w*i), y+h, x+(distance_w*(i+1)), y+h, x, y+h-(distance_h*(i+1)));
                    } else {
                        losangle.draw(x, y+(distance_h*i), x+(distance_w*i), y, x+(distance_w*(i+1)), y, x, y+(distance_h*(i+1)));
                    }
                    fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
                }
                for (i=0; i<n/2; i++) {
                    losangle.fillStyle =  c[fill_index];
                    if (d==="left") {
                        losangle.draw(x+(distance_w*i), y, x+w, y+h-(distance_h*i), x+w, y+h-(distance_h*(i+1)), x+(distance_w*(i+1)), y);
                    } else {
                        losangle.draw(x+(distance_w*i), y+h, x+w, y+(distance_h*i), x+w, y+(distance_h*(i+1)), x+(distance_w*(i+1)), y+h);
                    }
                    fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
                }
            }
        } 
    }

    var CanvasDraw = {
        draw:function() {    
            context.clearRect(0,0,canvas.width, canvas.height);
            Stephenator.drawSet();
            //window.requestAnimationFrame(CanvasDraw.draw);  
        },
        init:function() {
            this.draw();
        }   
    }

    CanvasDraw.init();

});