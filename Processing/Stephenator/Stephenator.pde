StephenWestfall artist = new StephenWestfall();

float set_position_x;
float set_position_y;
float set_width;
float set_height;
int set_division;
int set_square_division;
color[] set_square_colors;

float frame_length;
float frame_size;
float frame_distance;
color[] frame_colors;

void setup() {

  size(500, 500);

  colorMode(HSB, 360, 100, 100);

  set_position_x = 0;
  set_position_y = 0;
  set_width = width;
  set_height = height;
  set_division = 3;
  set_square_division = 8;
  set_square_colors = artist.colors;

  frame_length = 3;
  frame_size = width/12;
  frame_distance = frame_size*2;
  frame_colors = artist.colors;
}

void draw() {

  background(artist.colors[4]);

  noStroke();

  drawSet(set_position_x, set_position_y, set_width, set_height, set_division, set_square_division, set_square_colors);
  artist.drawFrames(frame_length, frame_size, frame_distance, artist.colors[2]);

  stop();
}

void drawSet(float x, float y, float w, float h, int n, int n_square, color...c) {

  float square_width = w/n;
  float square_height = h/n;

  Direction d = Direction.RIGHT;

  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      artist.diagonallyStripedSquare(x+(square_width*j), y+(square_height*i), square_width, square_height, n_square, d, c);
      d = (d==Direction.LEFT) ? Direction.RIGHT : Direction.LEFT;
    }
    if ( n % 2 == 0 )
      d = (d==Direction.LEFT) ? Direction.RIGHT : Direction.LEFT;
  }
}