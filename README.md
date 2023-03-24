# Canvas-Clock
A working analogue clock face for html using the &lt;canvas> tag and javascript.
![logo](https://github.com/jordanMartayn/Canvas-Clock/blob/main/CanvasClockBanner.png)

I have written two examples to show how you might use canvas-clock, a basic and dynamic example.

The setup is simple: <br>
<br>
1.Include the CanvasClockV2.js file, ie with &lt;script src=CanvasClockV2.js></script> <br>
2.Create a &lt;canvas> tag of any size with aspect ratio 1/1. (200-800 works best). <br>
3.Using javascript get the canvas element, ie with: const clockCnvs = document.getElementById("id"); <br>
4.Call analogueClock(clockCnvs,"draw"); <br> 
&nbsp;&nbsp;&nbsp;&nbsp;which will draw the clock face with the time displayed, analogueClock(clockCnvs,"wipe") will "wipe" the canvas <br>
&nbsp;&nbsp;&nbsp;&nbsp;clean. <br>
5.To make the clock update every second, you will need to use some form of loop such as setInterval ie: <br>
<br>
  &nbsp;&nbsp;&nbsp;&nbsp;function clockLoop(){ <br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;analogueClock(clockCnvs,"wipe"); <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;analogueClock(clockCnvs,"draw"); <br>
 &nbsp;&nbsp;&nbsp;&nbsp; }; <br>
  &nbsp;&nbsp;&nbsp;&nbsp;setInterval(clockLoop,1000); <br>
  <br>
 6. Done.

This is all shown in my provided BasicExample.html, see also a resizing exmple in the DynamicExample.html, works best between 200-800 width/height.
  
