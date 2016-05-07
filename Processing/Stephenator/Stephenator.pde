StephenWestfall artist = new StephenWestfall();

float   painting_x;
float   painting_y;
float   painting_width;
float   painting_height;

int     painting_rows;
int     painting_colums;
Direction start_direction;

int     square_division;
color[] square_colors;

float   frames;
float   frame_size;
float   frame_distance;
color[] frame_colors;

void setup() {

  size(500, 500);

  painting_x = 10;
  painting_y = 10;
  painting_width = 480;
  painting_height = 480;
  
  painting_rows = 4;
  painting_colums = 4;
  start_direction = Direction.LEFT;
  
  square_division = 5;
  square_colors = artist.colors;

  frames = 0;
  frame_size = width/12;
  frame_distance = frame_size*2;
  frame_colors = artist.colors;
  
}

void draw() {

  background(255);
  noStroke();
  drawSet(painting_x, painting_y, painting_width, painting_height, painting_rows, painting_colums, square_division, start_direction, square_colors);
  //artist.drawFrames(frame_length, frame_size, frame_distance, artist.colors[2]);
  stop();
}

void drawSet(float x, float y, float w, float h, int row, int col, int square_division, Direction start_direction, color...c) {

  float square_width = w/col;
  float square_height = h/row;
  
  Direction current_direction = start_direction;
  
  for (int i = 0; i < row; i++) {
    for (int j = 0; j < col; j++) {
      artist.diagonallyStripedSquare(x+(square_width*j), y+(square_height*i), square_width, square_height, square_division, current_direction, c);
      if (start_direction == Direction.LEFT) current_direction = (current_direction==start_direction) ? Direction.RIGHT : Direction.LEFT;
      else current_direction = (current_direction==start_direction) ? Direction.LEFT : Direction.RIGHT;
    }
    if ( row % 2 == 0 ) { 
      if (start_direction == Direction.LEFT) current_direction = (current_direction==start_direction) ? Direction.RIGHT : Direction.LEFT;
      else current_direction = (current_direction==start_direction) ? Direction.LEFT : Direction.RIGHT;
    }
  }
}