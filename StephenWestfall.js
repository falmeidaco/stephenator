/*global window: false */
/*global document: false */
/*global console: false */
(function () {
    'use strict';
    
    
    var StephenWestfall = function (canvasElementId) {
        
        //Definindo variáveis
        var canvas, context, default_colors, props, drawFixedColorFullSquare, polygon, $this = this;
        //Defnindo paleta de cores padrão
        default_colors = ["#dcdadd", "#2290c1", "#ddac2c", "#421f35", "#e5702d", "#16205b", "#26863e", "#df4634", "#1288b6", "#282826", "#316654"];
        
        //Propriedades do objeto
        props = {
            orginal_square_division:    true,
            painting_x:                 0,
            painting_y:                 0,
            painting_width:             100,
            painting_height:            100,
            painting_rows:              5,
            painting_colums:            5,
            start_direction:            "left",
            square_division:            1,
            square_colors:              [],
            frames_enabled:             true,
            frames:                     10,
            frame_size:                 5,
            frame_distance:             10,
            frame_colors:               []
        };
        
        polygon = {
            fillStyle: "",
            draw: function (c, p1, p2, p3, p4, p5, p6, p7, p8) {
                var i;
                if (typeof p1 === "object") {
                    c.fillStyle = this.fillStyle;
                    c.beginPath();
                    c.moveTo(p1[0][0], p1[0][1]);
                    for (i = 1; i < p1.length; i += 1) {
                        c.lineTo(p1[i][0], p1[i][1]);
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
        };
        
        this.drawFixedColorFullSquare = function (x, y, w, h, n, d, c) {
        //Iniciando variáveis
            var i,
                half_n,
                fill_index = 0,
                //Largura horizontal da barra
                bar_width = (w * 2) / n,
                //Largura vertical da barra
                bar_height = (h * 2) / n,
                //Metade da largura horizontal da barra
                half_bar_width = bar_width / 2,
                //Metade da largura vertical da barra
                half_bar_height = bar_height / 2;

            //Verifica se o número total de barras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da barra central
            if (n % 2 > 0) {
                half_n = (n - 1) / 2;
                //Lado1
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x, y + h - (bar_height * i), x + (bar_width * i), y + h, x + (bar_width * (i + 1)), y + h, x, y + h - (bar_height * (i + 1)));
                    } else {
                        polygon.draw(context, x, y + (bar_height * i), x + (bar_width * i), y, x + (bar_width * (i + 1)), y, x, y + (bar_height * (i + 1)));
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
                //Desenho da barra central
                polygon.fillStyle = c[fill_index];
                if (d === "left") {
                    polygon.draw(context, [
                        [x, y],
                        [x + half_bar_width, y],
                        [x + w, y + h - half_bar_height],
                        [x + w, y + h],
                        [x + w - half_bar_width, y + h],
                        [x, y + half_bar_height]
                    ]);
                } else {
                    polygon.draw(context, [
                        [x, y + h],
                        [x, y + h - half_bar_height],
                        [x + w - half_bar_width, y],
                        [x + w, y],
                        [x + w, y + half_bar_height],
                        [x + half_bar_width, y + h]
                    ]);
                }
                fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                //Lado 2
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x + (bar_width * i) + half_bar_width, y, x + w, y + h - (bar_height * i) - half_bar_height, x + w, y + h - (bar_height * (i + 1)) - half_bar_height, x + (bar_width * (i + 1)) + half_bar_width, y);
                    } else {
                        polygon.draw(context, x + (bar_width * i) + half_bar_width, y + h, x + w, y + (bar_height * i) + half_bar_height, x + w, y + (bar_height * (i + 1)) + half_bar_height, x + (bar_width * (i + 1)) + half_bar_width, y + h);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
            //Caso o número de barras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de barras pela metade
            } else {
                //Lado 1
                for (i = 0; i < n / 2; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x, y + h - (bar_height * i), x + (bar_width * i), y + h, x + (bar_width * (i + 1)), y + h, x, y + h - (bar_height * (i + 1)));
                    } else {
                        polygon.draw(context, x, y + (bar_height * i), x + (bar_width * i), y, x + (bar_width * (i + 1)), y, x, y + (bar_height * (i + 1)));
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
                //Lado 2
                for (i = 0; i < n / 2; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x + (bar_width * i), y, x + w, y + h - (bar_height * i), x + w, y + h - (bar_height * (i + 1)), x + (bar_width * (i + 1)), y);
                    } else {
                        polygon.draw(context, x + (bar_width * i), y + h, x + w, y + (bar_height * i), x + w, y + (bar_height * (i + 1)), x + (bar_width * (i + 1)), y + h);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
            }
        };
        
        this.drawOriginalColorFullSquare = function (x, y, w, h, n, d, c) {
            //Iniciando variáveis
            var i,
                half_n,
                fill_index = 0,
                bar_width,
                bar_height;
            //Verifica se o número total de barras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da barra central
            if (n % 2 > 0) {
                //Número de barras de cada lado
                half_n = (n - 1) / 2;
                //Largura horizontal da barra
                bar_width = w / ((n + 1) / 2);
                //Largura vertical da barra
                bar_height = h / ((n - 1) / 2);
                //Lado esquerdo
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x, y + h - (bar_height * i), x + (bar_width * i), y + h, x + (bar_width * (i + 1)), y + h, x, y + h - (bar_height * (i + 1)));
                    } else {
                        polygon.draw(context, x + (bar_width * i), y, x, y + (bar_height * i), x, y + (bar_height * (i + 1)), x + (bar_width * (i + 1)), y);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
                //Barra central
                polygon.fillStyle = c[fill_index];
                if (d === "left") {
                    polygon.draw(context, x, y, x + w - bar_width, y + h, x + w, y + h, x + bar_width, y);
                } else {
                    polygon.draw(context, x, y + h, x + w - bar_width, y, x + w, y, x + bar_width, y + h);
                }
                fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                //Lado direito
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x + (bar_width * (i + 1)), y, x + w, y + h - (bar_height * i), x + w, y + h - (bar_height * (i + 1)), x + (bar_width * (i + 2)), y);
                    } else {
                        polygon.draw(context, x + (bar_width * (i + 1)), y + h, x + w, y + (bar_height * i), x + w, y + (bar_height * (i + 1)), x + (bar_width * (i + 2)), y + h);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
            //Caso o número de barras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de barras pela metade
            } else {
                //Número de barras de cada lado
                half_n = n / 2;
                //Largura horizontal da barra
                bar_width = (w * 2) / n;
                //Largura vertical da barra
                bar_height = (h * 2) / n;
                //Lado direto
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x, y + h - (bar_height * i), x + (bar_width * i), y + h, x + (bar_width * (i + 1)), y + h, x, y + h - (bar_height * (i + 1)));
                    } else {
                        polygon.draw(context, x, y + (bar_height * i), x + (bar_width * i), y, x + (bar_width * (i + 1)), y, x, y + (bar_height * (i + 1)));
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
                //Lado esquerdo
                for (i = 0; i < half_n; i += 1) {
                    polygon.fillStyle = c[fill_index];
                    if (d === "left") {
                        polygon.draw(context, x + (bar_width * i), y, x + w, y + h - (bar_height * i), x + w, y + h - (bar_height * (i + 1)), x + (bar_width * (i + 1)), y);
                    } else {
                        polygon.draw(context, x + (bar_width * i), y + h, x + w, y + (bar_height * i), x + w, y + (bar_height * (i + 1)), x + (bar_width * (i + 1)), y + h);
                    }
                    fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
                }
            }
        };
        
        this.drawOverFrames = function (l, s, d, c) {
            var i,
                fill_index = 0;
            for (i = 0; i < l; i += 1) {
                context.fillStyle = c[fill_index];
                context.fillRect(props.painting_width / 2 - s - d * i, props.painting_height / 2 - s - (d * i), s * 2 + ((d * i) * 2), s);
                context.fillRect(props.painting_width / 2 - s - d * i, props.painting_height / 2 + (d * i), s * 2 + ((d * i) * 2), s);
                context.fillRect(props.painting_width / 2 - s - d * i, props.painting_height / 2 - s - (d * i), s, s * 2 + ((d * i) * 2));
                context.fillRect(props.painting_width / 2 + d * i, props.painting_height / 2 - s - (d * i), s, s * 2 + ((d * i) * 2));
                fill_index = (fill_index + 1 < c.length) ? fill_index + 1 : 0;
            }
        };
        
        this.drawPainting = function (context) {
            var i, j,
                square_width = props.painting_width / props.painting_colums,
                square_height = props.painting_height / props.painting_rows,
                fill_colors = 0,
                current_direction = props.start_direction;
            
            for (i = 0; i < props.painting_rows; i += 1) {
                for (j = 0; j < props.painting_colums; j += 1) {
                    if (props.orginal_square_division) {
                        $this.drawOriginalColorFullSquare(props.painting_x + (square_width * j), props.painting_y + (square_height * i), square_width, square_height, props.square_division, current_direction, props.square_colors[fill_colors]);
                    } else {
                        $this.drawFixedColorFullSquare(props.painting_x + (square_width * j), props.painting_y + (square_height * i), square_width, square_height, props.square_division, current_direction, props.square_colors[fill_colors]);
                    }
                    if (props.start_direction === "left") {
                        current_direction = (current_direction === props.start_direction) ? "right" : "left";
                    } else {
                        current_direction = (current_direction === props.start_direction) ? "left" : "right";
                    }
                    fill_colors = (fill_colors + 1 < props.square_colors.length) ? fill_colors + 1 : 0;
                }
                if (props.painting_colums % 2 === 0) {
                    if (props.start_direction === "left") {
                        current_direction = (current_direction === props.start_direction) ? "right" : "left";
                    } else {
                        current_direction = (current_direction === props.start_direction) ? "left" : "right";
                    }
                }
            }
            
            if (props.frames_enabled) {
                $this.drawOverFrames(props.frames, props.frame_size, props.frame_distance, props.frame_colors);
            }
            
        };
        
        //Public methods
        
        this.redraw = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            $this.drawPainting(context);
        };
        
        this.getCanvas = function () {
            return canvas;
        };
        
        this.getContext = function () {
            return context;
        };
        
        this.getDefaultColors = function () {
            return default_colors.slice();
        };
        
        this.getProp = function (name) {
            if (name === undefined) {
                return props;
            } else {
                return props[name];
            }
        };
        
        this.setProp = function (name, value) {
            if (props[name] !== undefined) {
                props[name] = value;
            }
            return $this;
        };
        
        this.changeDivision = function (division) {
            if (division !== undefined && typeof division === "boolean") {
                props.orginal_square_division = division;
            } else {
                props.orginal_square_division = (props.orginal_square_division) ? false : true;
            }
            return $this;
        };
        
        this.changeStartDirection = function (direction) {
            if (direction !== undefined && (String(direction) === "left" || String(direction) === "right")) {
                props.start_direction = direction;
            } else {
                props.start_direction = (props.start_direction === "left") ? "right" : "left";
            }
            return $this;
        };
        
        this.move = function (x, y) {
            props.painting_x = (x === "default") ? props.painting_x : parseInt(x, 10);
            props.painting_y = (y === "default") ? props.painting_y : parseInt(y, 10);
            return $this;
        };
        
        this.moveX = function (x) {
            props.painting_x = parseInt(x, 10);
            return $this;
        };
        
        this.moveY = function (y) {
            props.painting_y = parseInt(y, 10);
            return $this;
        };
        
        this.resize = function (width, height) {
            props.painting_width = (width === undefined || parseInt(width, 10) < 0) ? canvas.width : parseInt(width, 10);
            props.painting_height = (height === undefined || parseInt(height, 10) < 0) ? canvas.height : parseInt(height, 10);
            return $this;
        };
        
        this.addRow = function () {
            props.painting_rows += 1;
            return $this;
        };
        
        this.removeRow = function () {
            if (props.painting_rows - 1 > 0) {
                props.painting_rows -= 1;
            }
            return $this;
        };
        
        this.setRow = function (n) {
            if (parseInt(n, 10) > 0) {
                props.painting_rows = Math.abs(parseInt(n, 10));
            }
            return $this;
        };
        
        this.addColumn = function () {
            props.painting_colums += 1;
            return $this;
        };
        
        this.removeColumn = function () {
            if (props.painting_colums - 1 > 0) {
                props.painting_colums -= 1;
            }
            return $this;
        };
        
        this.setColumn = function (n) {
            if (parseInt(n, 10) > 0) {
                props.painting_colums = Math.abs(parseInt(n, 10));
            }
            return $this;
        };
        
        this.addSquareDivision = function () {
            props.square_division += 1;
            return $this;
        };
        
        this.removeSquareDivision = function () {
            if (props.square_division - 1 > 0) {
                props.square_division -= 1;
            }
            return $this;
        };
        
        this.setSquareDivision = function (n) {
            if (parseInt(n, 10) > 0) {
                props.square_division = Math.abs(parseInt(n, 10));
            }
            return $this;
        };
        
        this.addPalette = function (colors) {
            if (typeof colors === "object" && Array.isArray(colors)) {
                props.square_colors.push(colors);
            } else if (typeof colors === "string") {
                props.square_colors.push([colors]);
            } else {
                props.square_colors.push([]);
            }
            return $this;
        };
        
        this.removePalette = function (i) {
            if (i === undefined) {
                if (props.square_colors.length > 1) {
                    props.square_colors.pop();
                }
            } else {
                if (props.square_colors.length > 1) {
                    props.square_colors.splice(Math.abs(parseInt(i, 10)), 1);
                }
            }
            return $this;
        };
        
        this.addColor = function (color, palletId) {
            if (props.square_colors[palletId] !== undefined) {
                props.square_colors[palletId].push(String(color));
            }
            return $this;
        };
        
        this.removeColor = function (colorId, palletId) {
            if (palletId !== undefined) {
                if (props.square_colors[Math.abs(parseInt(palletId, 10))] !== undefined) {
                    props.square_colors[Math.abs(parseInt(palletId, 10))].splice(Math.abs(parseInt(colorId, 10)), 1);
                }
            } else {
                props.square_colors[Math.abs(parseInt(colorId, 10))].pop();
            }
            return $this;
        };
        
        /* TODO melhorar ação interna */
        this.setPaletteColor = function (color, colorId, paletteId) {
            if (props.square_colors[paletteId] !== undefined && props.square_colors[paletteId][colorId] !== undefined) {
                props.square_colors[paletteId][colorId] = color;
            }
            return $this;
        };
        
        this.changeFrames = function (enable) {
            if (typeof enable === "boolean") {
                props.frames_enabled = enable;
            } else {
                props.frames_enabled = (props.frames_enabled) ? false : true;
            }
            return $this;
        };
        
        this.setFrame = function (n) {
            props.frames = Math.abs(parseInt(n, 10));
            return $this;
        };
        
        this.addFrame = function () {
            props.frames += 1;
            return $this;
        };
        
        this.removeFrame = function () {
            if (props.frames - 1 >= 0) {
                props.frames -= 1;
            }
            return $this;
        };
        
        this.setFrameSize = function (size) {
            props.frame_size = Math.abs(parseInt(size, 10));
            return $this;
        };
        
        this.setFrameDistance = function (distance) {
            props.frame_distance = Math.abs(parseInt(distance, 10));
            return $this;
        };
        
        this.addFrameColor = function (color) {
            if (typeof color === "string") {
                props.frame_colors.push(color);
            }
            return $this;
        };
        
        this.setFrameColor = function (color, colorId) {
            if (typeof color === "string" && typeof props.frame_colors[colorId] !== undefined) {
                props.frame_colors[colorId] = color;
            }
            return $this;
        };
        
        this.removeFrameColor = function (colorId) {
            if (colorId !== undefined) {
                props.frame_colors.splice(Math.abs(parseInt(colorId, 10)), 1);
            } else {
                props.frame_colors.pop();
            }
            return $this;
        };
        
        //Definindo elemento canvas da página onde será o objeto será desenhado
        canvas = document.getElementById(canvasElementId);
        context = canvas.getContext("2d");
        
        //Definindo valores padrões
        props.painting_width = canvas.width;
        props.painting_height = canvas.height;
        props.square_division = default_colors.length;
        props.square_colors.push($this.getDefaultColors());
        props.frame_colors = $this.getDefaultColors();
        
    };
    
    window.StephenWestfall = StephenWestfall;
    
}());