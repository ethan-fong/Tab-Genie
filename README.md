# Tabgenie

Tabgenie is a tab generator for the guitar, designed to help guitar players learn how to play riffs and scales. The application generates a guitar tab in any key and scale that the user chooses, and a variety of settings keeps the tabs interesting and challenging to play. A simple user interface allows for easy use and the tab generation algorithm mimics the features of real guitar tabs (see [features](#features) section below). Thanks for reading!

## Demo
<p align="center">
  ![demogif](https://github.com/ethan-fong/Tabgenie/blob/main/docs/Recording%202022-05-19%20at%2001.38.49.gif)
</p>
## Features

- Generate tabs for any key and scale
- Subsequent notes are related to the previous note through gaussian probability distributions leading to better flow
- Notes more likely generated on strong beats (1/3) for an enhanced sense of rhythm
- Special features such as bends and slides can be generated
- Bad luck protection so tablature is never empty

## Installation
Requirements: Python 3.10 and PyInstaller 5.1


## Executable

To run a precompiled version of the application, download all the files in the **dist** folder and run the tabgenie.exe file. Note that the executable only works on windows OS.

## Contact

Ethan Fong - ethan.fong@mail.utoronto.ca

Project Link: https://github.com/ethan-fong/Tabgenie

## License
[MIT](https://choosealicense.com/licenses/mit/)
