color[] colors = {color(255, 0, 0), color(0, 0, 255), color(0, 255, 0), color(255, 255, 0), color(0, 255, 255), color(255, 0, 255), color(255, 255, 255), color(0, 0, 0)}; //<>//

void setup() {
  size(500, 500);
}

void draw() {
  background(255);
  noStroke();
  diagonalStripedSquare(0, 0, 250, 250, mouseX, Direction.LEFT, colors);
  diagonalStripedSquare(250, 0, 250, 250, mouseX, Direction.RIGHT, colors);
  diagonalStripedSquare(0, 250, 250, 250, mouseX, Direction.RIGHT, colors);
  diagonalStripedSquare(250, 250, 250, 250, mouseX, Direction.LEFT, colors);
}

void diagonalStripedSquare(float x, float y, float w, float h, float n, Direction d, color...c) {
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

public enum Direction {
  LEFT, RIGHT, UP, DOWN, LEFT_UP, LEFT_DOWN, RIGHT_UP, RIGHT_DOWN;
}