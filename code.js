import processing.sound.*;
import gab.opencv.*;
import processing.video.*;
import java.awt.*;
SoundFile file = null;
SoundFile[] audio;


Capture video;
OpenCV opencv;


boolean isPlaying = false;
PImage small;
int scaleFactor = 4;

void setup() {
  SoundFile[] files = {new SoundFile(this, "alarm.wav"), new SoundFile(this, "goaway.mp3") };
  audio = files;
  size(640, 480, P2D);
  video = new Capture(this, 640, 480);
  opencv = new OpenCV(this, video.width/scaleFactor, video.height/scaleFactor);
  opencv.loadCascade("haarcascade_frontalface_alt.xml");  

  small = createImage(opencv.width, opencv.height, ARGB);

  video.start();
}

void draw() {
  image(video, 0, 0 );

  small.copy(video, 0, 0, video.width, video.height, 0, 0, small.width, small.height);
  opencv.loadImage(small);

  noFill();
  scale(scaleFactor);
  stroke(0, 255, 0);
  Rectangle[] faces = opencv.detect();
  //file = audio[0];
  //println(faces.length);

  for (int i = 0; i < faces.length; i++) {
    rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
  }
    
  if (faces.length > 0 && file == null) {
    int index = int(floor(random(audio.length)));
    file = audio[index];
    
    //file = new SoundFile(this, "alarm.wav");
    //file.loop();
  }
   if (faces.length > 0 && !isPlaying ) {
    file.loop();
    isPlaying = true;
  }
   if (faces.length == 0 && file != null) {
    isPlaying=false;
    file.stop();
    file = null;
  }
 


}

void captureEvent(Capture c) {
  c.read();
}
