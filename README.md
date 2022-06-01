# :guitar: Tabgenie

Tabgenie is a tab generator for the guitar, designed to help guitar players learn how to play riffs and scales. A simple user interface allows for easy use and the tab generation algorithm mimics the features of real guitar tabs (see [features](#features) section below). 

May 28, 2022: Released on Google play store [here](https://play.google.com/store/apps/details?id=com.tabgenieproject.tabgenie)!

May 29, 2022: Ported to a web application [here](https://ethan-fong.github.io/Tab-Genie/)!

## Demo
:point_right:[If you want to try an interactive web version of the code, click here!](https://ethan-fong.github.io/Tab-Genie/) :point_left: 

Web application demo:  
  ![demogif2](https://github.com/ethan-fong/Tabgenie/blob/main/docs/Webappscreencap.gif)  
  
Windows version demo:  

  ![demogif](https://github.com/ethan-fong/Tabgenie/blob/main/docs/Recording%202022-05-19%20at%2001.38.49.gif)  
Android version demo:  
  ![demogif2](https://github.com/ethan-fong/Tabgenie/blob/main/docs/newscreencap.gif)

## Features

- Generate tabs for any key and scale
- Subsequent notes are related to the previous note through gaussian probability distributions leading to better flow
- Notes more likely generated on strong beats (1/3) for an enhanced sense of rhythm
- Special features such as bends and slides can be generated
- Difficulty setting to generate more or less notes (on average)

## Installation
Windows requirements: Python 3.10 and PyInstaller 5.1


## Executable

To run a precompiled version of the application, download all the files in the **dist** folder and run the tabgenie.exe file. Note that the executable only works on windows OS.

## Contact

Ethan Fong - ethan.fong@mail.utoronto.ca  
Alex Chak - alex.hy.chak@gmail.com

Project Link: https://github.com/ethan-fong/Tabgenie

## License
[MIT](https://choosealicense.com/licenses/mit/)
