# Canvas-Clock
A working analogue clock face for html using the &lt;canvas> tag and javascript.

I have written two examples to show how you might use canvas-clock, a basic and dynamic example.

The setup is simple: 
1.Include the CanvasClockV2.js file, ie with &lt;script src=CanvasClockV2.js></script>
2.Create a &lt;canvas> tag of any size.
3.Using javascript get the canvas element, ie with: const clockCnvs = document.getElementById("id");
4.call analogueClock(clockCnvs,"draw"); which will draw the clock face with the time displayed, analogueClock(clockCnvs,"wipe") will "wipe" the canvas        clean.
5.To make the clock update every second, you will need to use some form of loop such as setInterval ie:

  function clockLoop(){
    analogueClock(clockCnvs,"wipe");
    analogueClock(clockCnvs,"draw");
  };
  setInterval(clockLoop,1000);
  
 6. Done.
  
