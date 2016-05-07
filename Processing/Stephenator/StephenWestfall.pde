class StephenWestfall 
{
  Boolean orginal_square_division = true;
  color[] colors = {
    color(221, 221, 221), //branco
    color(34, 144, 193), //azul
    color(221, 172, 44), //amarelo
    color(66, 31, 53), //roxo
    color(229, 112, 45), //laranja
    color(22, 32, 91), //azul escuro
    color(38, 134, 62), //verde
    color(223, 70, 52), //vermelho
    color(40, 40, 38), //preto
    color(49, 102, 84) //verde musgo
  };
  //Método para criação da arte
  void drawPainting(float x, float y, float w, float h, int row, int col, int square_division, Direction start_direction, color...c) {
    color[][] colors = {c};
    drawPainting(x,y,w,h,row,col,square_division,start_direction,colors);
  }
  void drawPainting(float x, float y, float w, float h, int row, int col, int square_division, Direction start_direction, color[]...c) { 
    float square_width = w/col;
    float square_height = h/row;
    int i, j, fill_colors = 0; 
    Direction current_direction = start_direction;
    for (i = 0; i < row; i++) {
      for (j = 0; j < col; j++) {
        drawColorFullSquare(x+(square_width*j), y+(square_height*i), square_width, square_height, square_division, current_direction, c[fill_colors]);
        if (start_direction == Direction.LEFT) current_direction = (current_direction==start_direction) ? Direction.RIGHT : Direction.LEFT;
        else current_direction = (current_direction==start_direction) ? Direction.LEFT : Direction.RIGHT;
        fill_colors = (fill_colors+1<c.length) ? fill_colors+1 : 0 ;
      }
      if ( row % 2 == 0 ) { 
        if (start_direction == Direction.LEFT) current_direction = (current_direction==start_direction) ? Direction.RIGHT : Direction.LEFT;
        else current_direction = (current_direction==start_direction) ? Direction.LEFT : Direction.RIGHT;
      }
    }
  }
  void drawColorFullSquare(float x, float y, float w, float h, int n, Direction d, color...c) {
    if (orginal_square_division) {
      drawFixedColorFullSquare(x,y,w,h,n,d,c);
    } else {
      drawFixedColorFullSquare(x,y,w,h,n,d,c);
    }
  }
  //Vesão 'corrigida' do quadrado listrado
  void drawFixedColorFullSquare(float x, float y, float w, float h, int n, Direction d, color...c) {
    //Iniciando variáveis
    int i, half_n, fill_index = 0;
    //Largura horizontal da barra
    float bar_width = (w*2)/n;
    //Largura vertical da barra
    float bar_height = (h*2)/n;
    //Metade da largura horizontal da barra
    float half_bar_width = bar_width/2;
    //Metade da largura vertical da barra
    float half_bar_height = bar_height/2;
    //Verifica se o número total de barras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da barra central
    if (n%2>0) {
      half_n = (n-1)/2;
      //Lado1
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x, y+h-(bar_height*i), x+(bar_width*i), y+h, x+(bar_width*(i+1)), y+h, x, y+h-(bar_height*(i+1)));
        else quad(x, y+(bar_height*i), x+(bar_width*i), y, x+(bar_width*(i+1)), y, x, y+(bar_height*(i+1)));
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      //Desenho da barra central
      fill(c[fill_index]);
      if (d==Direction.LEFT) {
        beginShape();
        vertex(x, y);
        vertex(x+half_bar_width, y);
        vertex(x+w, y+h-half_bar_height);
        vertex(x+w, y+h);
        vertex(x+w-half_bar_width, y+h);
        vertex(x, y+half_bar_height);
        endShape(CLOSE);
      } else {
        beginShape();
        vertex(x, y+h);
        vertex(x, y+h-half_bar_height);
        vertex(x+w-half_bar_width, y);
        vertex(x+w, y);
        vertex(x+w, y+half_bar_height);
        vertex(x+half_bar_width, y+h);
        endShape(CLOSE);
      }
      fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      //Lado 2
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x+(bar_width*i)+half_bar_width, y, x+w, y+h-(bar_height*i)-half_bar_height, x+w, y+h-(bar_height*(i+1))-half_bar_height, x+(bar_width*(i+1))+half_bar_width, y);
        else quad(x+(bar_width*i)+half_bar_width, y+h, x+w, y+(bar_height*i)+half_bar_height, x+w, y+(bar_height*(i+1))+half_bar_height, x+(bar_width*(i+1))+half_bar_width, y+h);
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    //Caso o número de barras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de barras pela metade
    } else {
      //Lado 1
      for (i=0; i<n/2; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x, y+h-(bar_height*i), x+(bar_width*i), y+h, x+(bar_width*(i+1)), y+h, x, y+h-(bar_height*(i+1)));
        else quad(x, y+(bar_height*i), x+(bar_width*i), y, x+(bar_width*(i+1)), y, x, y+(bar_height*(i+1)));
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      //Lado 2
      for (i=0; i<n/2; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x+(bar_width*i), y, x+w, y+h-(bar_height*i), x+w, y+h-(bar_height*(i+1)), x+(bar_width*(i+1)), y);
        else quad(x+(bar_width*i), y+h, x+w, y+(bar_height*i), x+w, y+(bar_height*(i+1)), x+(bar_width*(i+1)), y+h);
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    }
  }
  //Vesão original do quadrado listrado
  void drawOriginalColorfulSquare(float x, float y, float w, float h, int n, Direction d, color...c) {
    //Iniciando variáveis
    int i, half_n, fill_index = 0;
    float bar_width, bar_height;
    //Verifica se o número total de barras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da barra central
    if (n%2>0) {
      //Número de barras de cada lado
      half_n = (n-1)/2;
      //Largura horizontal da barra
      bar_width = w/((n+1)/2);
      //Largura vertical da barra
      bar_height = h/((n-1)/2);
      //Lado esquerdo
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x, y+h-(bar_height*i), x+(bar_width*i), y+h, x+(bar_width*(i+1)), y+h, x, y+h-(bar_height*(i+1)));
        else quad(x+(bar_width*i), y, x, y+(bar_height*i), x, y+(bar_height*(i+1)), x+(bar_width*(i+1)), y);
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      //Barra central
      fill(c[fill_index]);
      if (d==Direction.LEFT) quad(x, y, x+w-bar_width, y+h, x+w, y+h, x+bar_width, y);
      else quad(x, y+h, x+w-bar_width, y, x+w, y, x+bar_width, y+h);
      fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      //Lado direito
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x+(bar_width*(i+1)), y, x+w, y+h-(bar_height*i), x+w, y+h-(bar_height*(i+1)), x+(bar_width*(i+2)), y);
        else quad(x+(bar_width*(i+1)), y+h, x+w, y+(bar_height*i), x+w, y+(bar_height*(i+1)), x+(bar_width*(i+2)), y+h);
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    //Caso o número de barras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de barras pela metade
    } else {
      //Número de barras de cada lado
      half_n = n/2;
      //Largura horizontal da barra
      bar_width = (w*2)/n;
      //Largura vertical da barra
      bar_height = (h*2)/n;
      //Lado direto
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x, y+h-(bar_height*i), x+(bar_width*i), y+h, x+(bar_width*(i+1)), y+h, x, y+h-(bar_height*(i+1)));
        else quad(x, y+(bar_height*i), x+(bar_width*i), y, x+(bar_width*(i+1)), y, x, y+(bar_height*(i+1)));
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      //Lado esquerdo
      for (i=0; i<half_n; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) quad(x+(bar_width*i), y, x+w, y+h-(bar_height*i), x+w, y+h-(bar_height*(i+1)), x+(bar_width*(i+1)), y);
        else quad(x+(bar_width*i), y+h, x+w, y+(bar_height*i), x+w, y+(bar_height*(i+1)), x+(bar_width*(i+1)), y+h);
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    }
  }  
  //Desenho dos quadros sobre o quadrado listrado
  void drawOverFrames(float l, float s, float d, color...c) {
    int i, fill_index = 0;
    fill(c[fill_index]);
    for (i = 0; i<l; i++) {
      fill(140);
      rect(width/2-s-d*i, height/2-s-(d*i), s*2+((d*i)*2), s);
      rect(width/2-s-d*i, height/2+(d*i), s*2+((d*i)*2), s);
      rect(width/2-s-d*i, height/2-s-(d*i), s, s*2+((d*i)*2));
      rect(width/2+d*i, height/2-s-(d*i), s, s*2+((d*i)*2));
      fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
    }
  }
  //Desenho do triângulo colorido
  void drawColorfulTriangle(float x, float y, float w, float h, int n, Direction d, color...c) {
    if (n>0) {
      int fill_index = 0;
      float intervalo_w = w/n;
      float intervalo_h = h/n;
      for (int i = 0; i < n; i++) {
        fill(c[fill_index]);
        switch(d) {
          case LEFT_DOWN:
            drawTriangle(x, y+(intervalo_h*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case RIGHT_UP:
            drawTriangle(x+(intervalo_w*i), y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case LEFT_UP:
            drawTriangle(x, y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case RIGHT_DOWN:
            drawTriangle(x+(intervalo_w*i), y+(intervalo_w*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case UP:
            drawTriangle(x+(intervalo_w*i)/2, y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case DOWN:
            drawTriangle(x+(intervalo_w*i)/2, y+(intervalo_w*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case LEFT:
            drawTriangle(x, y+(intervalo_w*i)/2, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case RIGHT:
            drawTriangle(x+(intervalo_w*i), y+(intervalo_w*i)/2, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;  
      }
    }
  }
  //Método auxiliar para desenho de um triângulo
  void drawTriangle(float x, float y, float w, float h, Direction d) {
    switch (d) {
      case LEFT:
        triangle(x, y+h/2, x+w, y, x+w,y+h);
        break;
      case RIGHT:
        triangle(x, y, x+w, y+h/2, x, y+h);
        break;
      case UP:
        triangle(x+w/2, y, x+w, y+h, x,y+h);
        break;
      case DOWN:
        triangle(x, y, x+w, y, x+w/2, y+h);
        break;
      case RIGHT_DOWN:
        triangle(x, y+h, x+w, y+h, x+w, y); 
        break;
      case RIGHT_UP:
        triangle(x, y, x+w, y, x+w, y+h); 
        break;
      case LEFT_DOWN: 
        triangle(x, y, x, y+h, x+w, y+h);
        break;
      case LEFT_UP:
        triangle(x, y+h, x, y, x+w, y);
        break;
       default:
       drawTriangle(x, y, w, h, Direction.UP);
    }
  } 
}

//Enum Directions utilizado para definir as direções das barras e dos triângulos
public enum Direction {
  LEFT, RIGHT, UP, DOWN, LEFT_UP, LEFT_DOWN, RIGHT_UP, RIGHT_DOWN;
}