void setup() {
  size(600, 600);
}

void draw() {
  background(255);
  quadradoColorido(0, 0, 300, 300, Direction.LEFT,  10, color(255));
  quadradoColorido(300, 0, 300, 300, Direction.RIGHT, 10, color(255));
  quadradoColorido(0, 300, 300, 300, Direction.RIGHT, 10, color(255));
  quadradoColorido(300, 300, 300, 300, Direction.LEFT, 10, color(255));
}

void quadradoColorido(float x, float y, float w, float h, Direction d, int v, color...c) {
  switch(d) {
    case LEFT:
      trianguloColorido(x, y, w, h, Direction.LEFT_UP, v, c);
      trianguloColorido(x, y, w, h, Direction.RIGHT_DOWN, v, c);
      break;
    case RIGHT:
      trianguloColorido(x, y, w, h, Direction.LEFT_DOWN, v, c);
      trianguloColorido(x, y, w, h, Direction.RIGHT_UP, v, c);
      break;
    default:
      quadradoColorido(x, y, w, h, Direction.LEFT, 10, c);
  }
}

void trianguloColorido(float x, float y, float w, float h, Direction d, int v, color...c) {
  if (v>0) {
    int fill_index = 0;
    float intervalo_w = w/v;
    float intervalo_h = h/v;
    for (int i = 0; i < v; i++) {
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

void losangoColorido(float x, float y, float w, float h, color...c) {
  int fill_index = 0;
  for (Direction d : Direction.values()) {
    switch(d) {
      case LEFT_UP:
        fill(c[fill_index]);
        triangulo(x, y, w/2, h/2, d);
        break;
      case LEFT_DOWN:
        fill(c[fill_index]);
        triangulo(x, y+h/2, w/2, h/2, d);
        break;
      case RIGHT_UP:
        fill(c[fill_index]);
        triangulo(x+w/2, y, w/2, h/2, d);
        break;
      case RIGHT_DOWN:
        fill(c[fill_index]);
        triangulo(x+w/2, y+h/2, w/2, h/2, d);
        break;
    }
    fill_index = (fill_index+1<c.length) ? fill_index+1 : 0 ;
  }
}

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

public enum Direction {
  LEFT, RIGHT, UP, DOWN, LEFT_UP, LEFT_DOWN, RIGHT_UP, RIGHT_DOWN;
}