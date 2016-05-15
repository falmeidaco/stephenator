var artist = new StephenWestfall("canvas");
        
(function($){
    $(document).ready(function() {

        //Iniciando objeto        
        artist.drawPainting();

        //Inicia perfectScrollBar
        $('.content').perfectScrollbar();

        //Reposiciona e redesenha pintura quando houver modificação do tamanho da janela
        $(window).resize(function (event) {
            $("#canvas-container").css({width:$(window).width(),height:$(window).height()});
            if ($(window).width() > $(window).height()) {
                $("#canvas").attr("width", $(window).width());
                $("#canvas").attr("height", $(window).width());
            } else {
                $("#canvas").attr("width", $(window).height());
                $("#canvas").attr("height", $(window).height());
            }
            //Atualiza perfectSrollBar
            $('.content').perfectScrollbar('update');
            //Redesenha
            artist.resize().redraw();
        }).resize();

        //Abrir e fechar painel de configurações da arte
        $('.panel-heading').on('click', function() {
            $(this).parent().find('.panel-body').toggle();
        });

        //Ajuste de divisão dos quadrados
        $("#orginal_square_division").change(function() {
           if ($(this).val() === "1") {
               artist.changeDivision(true).redraw();
           } else {
               artist.changeDivision(false).redraw();
           }
        }).find('option').each(function(i, e) {
            current_value = (artist.getProp("orginal_square_division")) ? "1" : "0";
            if ($(this).val() === current_value) {
                $(this).attr("selected", "selected");
            }
        });

        //Linhas
        $("#painting_rows").change(function() {
            artist.setRow($("#painting_rows").val()).redraw();
        }).val(artist.getProp("painting_rows"));
        //Colunas
        $("#painting_columns").change(function() {
            artist.setColumn($("#painting_columns").val()).redraw();
        }).val(artist.getProp("painting_colums"));

        //Direção Inicial
        $("#start_direction").change(function() {
            artist.changeStartDirection($(this).val()).redraw();
        }).find('option').each(function(i, e) {
            current_value = artist.getProp("start_direction");
            if ($(this).val() === current_value) {
                $(this).attr("selected", "selected");
            }
        });;

        //Divisão dos quadrados
        $("#square_division").change(function() {
            artist.setSquareDivision($("#square_division").val()).redraw();
        }).val(artist.getProp("square_division"));

        //Moldura sobrepostas
        $("#frames_enabled").change(function() {
           if ($(this).val() === "1") {
               artist.changeFrames(true).redraw();
           } else {
               artist.changeFrames(false).redraw();
           }
        }).find('option').each(function(i, e) {
            current_value = (artist.getProp("frames_enabled")) ? "1" : "0";
            if ($(this).val() === current_value) {
                $(this).attr("selected", "selected");
            }
        });
        //Número de molduras
        $("#frames").change(function() {
            artist.setFrame($("#frames").val()).redraw();
        }).val(artist.getProp("frames"));
        //Tamanho das molduras
        $("#frame_size").change(function() {
            artist.setFrameSize($("#frame_size").val()).redraw();
        }).val(artist.getProp("frame_size"));
        //Distância entre as molduras
        $("#frame_distance").change(function() {
            artist.setFrameDistance($("#frame_distance").val()).redraw();
        }).val(artist.getProp("frame_distance"));

        //Gerenciamento de cores dos quadrados
        function renderPaletteMananger() {

            //Reseta html
            $('#square_palettes').html("");

            for (i = 0; i < artist.getProp('square_colors').length; i+=1) {
                //Cria element html para a paleta
                var li = document.createElement('li');
                //Define atributos
                li.className = "palette-item";
                li.setAttribute('data-palette_id',i);
                //Adiciona evento para remover paleta
                li.addEventListener('dblclick',function() {
                    artist.removePalette(this.dataset.palette_id).redraw();
                    renderPaletteMananger();
                });

                for (j = 0; j < artist.getProp('square_colors')[i].length; j+=1) {

                    //Cria elemento html para a cor
                    var colorItem = document.createElement('div');
                    //Define atribudos
                    colorItem.className = "color-item";
                    colorItem.setAttribute('data-palette_id',i);
                    colorItem.setAttribute('data-color_id',j);
                    colorItem.setAttribute('data-color', artist.getProp('square_colors')[i][j]);
                    colorItem.style.backgroundColor = artist.getProp('square_colors')[i][j];

                    //Cria elemento html para remover cor
                    var colorItemRemove = document.createElement('a');
                    colorItemRemove.className = 'color-remove';
                    colorItemRemove.setAttribute('data-palette_id',i);
                    colorItemRemove.setAttribute('data-color_id',j);
                    colorItemRemove.addEventListener('click',function(event) {
                        artist.removeColor(this.dataset.color_id, this.dataset.palette_id).redraw();
                        event.stopPropagation();
                        renderPaletteMananger();
                    });
                    colorItem.appendChild(colorItemRemove);

                    //Adiciona cor à paleta                            
                    li.appendChild(colorItem);                            

                }

                //Cria botão para adicionar cor
                var addColor = document.createElement('div');
                addColor.className = "add-color";
                addColor.setAttribute('data-palette_id', i);
                addColor.addEventListener('click', function(event) {
                    artist.addColor(artist.getDefaultColors()[0], this.dataset.palette_id).redraw();
                    renderPaletteMananger();
                });
                //Adiciona botão à paleta
                li.appendChild(addColor);

                //Adiciona paleta
                $('#square_palettes').append(li);
            }
            //Instancia plugin da paleta de cores para os elementos
            $('#square_palettes div.color-item').colorpicker({
                colorSelectors: artist.getDefaultColors()
            }).on('changeColor', function(e) {
                $(e.currentTarget).css('background-color',e.color.toHex());
                artist.setPaletteColor(e.color.toHex(), $(e.currentTarget).data('color_id'), $(e.currentTarget).data('palette_id')).redraw();
            });

        };

        renderPaletteMananger();

        $("#add-set").click(function() {
            var colors = artist.getDefaultColors();
            artist.addPalette(colors).redraw();
            renderPaletteMananger();
        });

        function frameRenderPaletteMananger () {

            //Reseta html
            $('#frame_palettes').html("");

            //Cria element html para a paleta
            var li = document.createElement('li');
            //Define atributos
            li.className = "palette-item";

            for (i = 0; i < artist.getProp('frame_colors').length; i+=1) {

                //Cria elemento html para a cor
                var colorItem = document.createElement('div');
                //Define atribudos
                colorItem.className = "color-item";
                colorItem.setAttribute('data-color_id',i);
                colorItem.setAttribute('data-color', artist.getProp('frame_colors')[i]);
                colorItem.style.backgroundColor = artist.getProp('frame_colors')[i];

                //Cria elemento html para remover cor
                var colorItemRemove = document.createElement('a');
                colorItemRemove.className = 'color-remove';
                colorItemRemove.setAttribute('data-color_id',i);
                colorItemRemove.addEventListener('click',function(event) {
                    artist.removeFrameColor(this.dataset.color_id).redraw();
                    event.stopPropagation();
                    frameRenderPaletteMananger();
                });
                colorItem.appendChild(colorItemRemove);

                //Adiciona cor à paleta                            
                li.appendChild(colorItem);                            

            }

            //Cria botão para adicionar cor
            var addColor = document.createElement('div');
            addColor.className = "add-color";
            addColor.addEventListener('click', function(event) {
                artist.addFrameColor(artist.getDefaultColors()[0]).redraw();
                frameRenderPaletteMananger();
            });
            //Adiciona botão à paleta
            li.appendChild(addColor);

            //Adiciona paleta
            $('#frame_palettes').append(li);

            //Instancia plugin da paleta de cores para os elementos
            $('#frame_palettes div.color-item').colorpicker({
                colorSelectors: artist.getDefaultColors()
            }).on('changeColor', function(e) {
                $(e.currentTarget).css('background-color', e.color.toHex());
                artist.setFrameColor(e.color.toHex(), $(e.currentTarget).data('color_id')).redraw();
            });  
        };
        frameRenderPaletteMananger();
    });
}(jQuery));