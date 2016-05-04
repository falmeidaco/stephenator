class StephenWestfall {

  color[] colors = {
    color(0, 0, 0), //preto
    color(0,75,80), //vermelho
    color(11,43,86), //rosa
    color(25,98,84), //laranja
    color(48,99,91), //amarelo
    color(159,55,50), //verde
    color(255,69,49), //azul marinho
    color(341, 69, 36), //roxo
    color(0, 0, 100), //branco
  };
  
  void triangulo(float x, float y, float w, float h, Direction d) {
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
       triangulo(x, y, w, h, Direction.UP);
    }
  }
  
  void trianguloColorido(float x, float y, float w, float h, int n, Direction d, color...c) {
    if (n>0) {
      int fill_index = 0;
      float intervalo_w = w/n;
      float intervalo_h = h/n;
      for (int i = 0; i < n; i++) {
        fill(c[fill_index]);
        switch(d) {
          case LEFT_DOWN:
            triangulo(x, y+(intervalo_h*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case RIGHT_UP:
            triangulo(x+(intervalo_w*i), y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case LEFT_UP:
            triangulo(x, y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case RIGHT_DOWN:
            triangulo(x+(intervalo_w*i), y+(intervalo_w*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
          case UP:
            triangulo(x+(intervalo_w*i)/2, y, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case DOWN:
            triangulo(x+(intervalo_w*i)/2, y+(intervalo_w*i), w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case LEFT:
            triangulo(x, y+(intervalo_w*i)/2, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
         case RIGHT:
            triangulo(x+(intervalo_w*i), y+(intervalo_w*i)/2, w-(intervalo_w*i), h-(intervalo_h*i), d);
            break;
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;  
      }
    }
  }
  
  void diagonallyStripedSquare(float x, float y, float w, float h, float n, Direction d, color...c) {
    //Largura horizontal e vertical de cada listra
    float distance_w = (w*2)/n;
    float distance_h = (h*2)/n;
    //Metada da largura horizontal e vertical de cada listra
    float half_distance_w = ((w*2)/n)/2;
    float half_distance_h = ((h*2)/n)/2;
    //Variáveis de controle
    int i, fill_index = 0;
    
    //Verifica se o número total de listras é ímpar. Caso verdadeiro, ele faz o desenho utilizando o algorítimo que faz o desenho da listra central
    if (n%2>0) {
      
      int half = ((int)n-1)/2;
      
      for (i=0; i<half; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) {
          quad(x, y+h-(distance_h*i), x+(distance_w*i), y+h, x+(distance_w*(i+1)), y+h, x, y+h-(distance_h*(i+1)));
        } else {
          quad(x, y+(distance_h*i), x+(distance_w*i), y, x+(distance_w*(i+1)), y, x, y+(distance_h*(i+1)));
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      
      //Desenho da listra central
      fill(c[fill_index]);
      if (d==Direction.LEFT) {
        quad(x, y+half_distance_h, x+w-half_distance_w, y+h, x+w, y+h, x, y);
        quad(x, y, x+w, y+h, x+w, y+h-half_distance_h, x+half_distance_w, y);
      } else {
        quad(x, y+(h-half_distance_h), x+(w-half_distance_w), y, x+w, y, x, y+h);
        quad(x, y+h, x+w, y, x+w, y+half_distance_h, x+half_distance_w, y+h);
      }
      fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      
      for (i=0; i<half; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) {
          quad(x+(distance_w*i)+half_distance_w, y, x+w, y+h-(distance_h*i)-half_distance_h, x+w, y+h-(distance_h*(i+1))-half_distance_h, x+(distance_w*(i+1))+half_distance_w, y);
        } else {
          quad(x+(distance_w*i)+half_distance_w, y+h, x+w, y+(distance_h*i)+half_distance_h, x+w, y+(distance_h*(i+1))+half_distance_h, x+(distance_w*(i+1))+half_distance_w, y+h);
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    //Caso o número de listras seja par, ele faz o desenho utilizando o algorítimo que divide o número total de listras pela metade
    } else {
      for (i=0; i<n/2; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) {
          quad(x, y+h-(distance_h*i), x+(distance_w*i), y+h, x+(distance_w*(i+1)), y+h, x, y+h-(distance_h*(i+1)));
        } else {
          quad(x, y+(distance_h*i), x+(distance_w*i), y, x+(distance_w*(i+1)), y, x, y+(distance_h*(i+1)));
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
      for (i=0; i<n/2; i++) {
        fill(c[fill_index]);
        if (d==Direction.LEFT) {
          quad(x+(distance_w*i), y, x+w, y+h-(distance_h*i), x+w, y+h-(distance_h*(i+1)), x+(distance_w*(i+1)), y);
        } else {
          quad(x+(distance_w*i), y+h, x+w, y+(distance_h*i), x+w, y+(distance_h*(i+1)), x+(distance_w*(i+1)), y+h);
        }
        fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
      }
    }
  }
  
}

public enum Direction {
  LEFT, RIGHT, UP, DOWN, LEFT_UP, LEFT_DOWN, RIGHT_UP, RIGHT_DOWN;
}