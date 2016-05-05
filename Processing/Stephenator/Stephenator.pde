StephenWestfall artist = new StephenWestfall();

float set_position_x;
float set_position_y;
float set_width;
float set_height;
int set_division;
int set_square_division;
color[] set_square_colors;

void setup() {
  
  size(500, 500);
  
  colorMode(HSB, 360, 100, 100);
  
  set_position_x = 0;
  set_position_y = 0;
  set_width = width;
  set_height = height;
  set_division = 2;
  set_square_division = 8;
  set_square_colors = artist.colors;
  
}

void draw() {
  
  background(artist.colors[4]);
  
  //noStroke();
  
  //drawSet(set_position_x, set_position_y, set_width, set_height, set_division, set_square_division, set_square_colors);
  
  stop();
  
}

void drawSet(float x, float y, float w, float h, int n, int n_square,  color...c) {
  
  float square_width = w/n;
  float square_height = h/n;
  
  color[] current_set = new color[n_square];
  
  Direction d = Direction.RIGHT;
  
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      for (int k = 0; k < current_set.length; k++) {
        current_set[k] = c[(int)random(c.length)];
      }
      artist.diagonallyStripedSquare(x+(square_width*j), y+(square_height*i), square_width, square_height, n_square, d, current_set);
      d = (d==Direction.LEFT) ? Direction.RIGHT : Direction.LEFT;
    }
    if ( n % 2 == 0 )
      d = (d==Direction.LEFT) ? Direction.RIGHT : Direction.LEFT;
  }
  
}