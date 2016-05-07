StephenWestfall artist = new StephenWestfall();

float   painting_x;
float   painting_y;
float   painting_width;
float   painting_height;

int     painting_rows;
int     painting_colums;
Direction start_direction;

int     square_division;
color[] square_colors,square_colors2;

float   frames;
float   frame_size;
float   frame_distance;
color[] frame_colors;

void setup() {
  size(500, 500);
  //Propriedades da arte
  painting_x = 10;
  painting_y = 10;
  painting_width = 480;
  painting_height = 480;
  //Divisão da arte
  painting_rows = 4;
  painting_colums = 4;
  start_direction = Direction.LEFT;
  //Propriedade do elemento 'squares'
  square_division = 9;
  //Paleta de cores 1
  square_colors = artist.colors;
  //Paleta de cores 2
  square_colors2 = new color[]{
    artist.colors[9], 
    artist.colors[8], 
    artist.colors[7], 
    artist.colors[6], 
    artist.colors[5], 
    artist.colors[4], 
    artist.colors[3], 
    artist.colors[2], 
    artist.colors[1], 
    artist.colors[0]};
  //Propriedade do elemento 'frames'
  frames = 0;
  frame_size = width/12;
  frame_distance = frame_size*2;
  frame_colors = artist.colors; 
}

void draw() {
  background(255);
  noStroke();
  artist.drawPainting(painting_x, painting_y, painting_width, painting_height, painting_rows, painting_colums, square_division, start_direction, square_colors, square_colors2);
  stop();
}