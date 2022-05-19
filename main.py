# To actiate virtual environment:
# kivy_venv\Scripts\activate

# import kivy and dependencies
from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import Screen
from kivy.uix.label import Label
from kivy.uix.widget import Widget
import random
from functions import tab_gen

# create classes for the screens so kivy screenmanager can interact with them
class HomeScreen(Screen):
    pass

class SettingsScreen(Screen):
    pass

class StartScreen(Screen):
    pass

# loads main.kv which also loads screen kv files
GUI = Builder.load_file("main.kv")

# main app funcitonality
class MainApp(App):

    # app variables, made global so class functions can make use of them
    global difficulty_v
    global key_v
    global scale_v
    global note_v
    global bars_v

    # default values
    note_v = "quarter"
    difficulty_v = "medium"
    key_v = "E"
    scale_v = "Minor Pentatonic"
    bars_v = 3

    # this function is called on a specific button see id:gen in homescreen.kv
    def generate_button(self):
        # create objects for all the text labels so we can change what they say
        h_txt = self.root.ids['home_screen'].ids['home_txt']
        e1o = self.root.ids['home_screen'].ids['e1']
        b2o = self.root.ids['home_screen'].ids['b2']
        g3o = self.root.ids['home_screen'].ids['g3']
        d4o = self.root.ids['home_screen'].ids['d4']
        a5o = self.root.ids['home_screen'].ids['a5']
        e6o = self.root.ids['home_screen'].ids['e6']

        # change the text attribute of the labels
        h_txt.text = "Random tab number: " + str(random.randint(0,500))
        # print(key_v)
        # print(difficulty_v)
        # print(scale_v)

        # generate a tab, calling a function in functions.py
        tab_gend = tab_gen(key_v,difficulty_v,scale_v,note_v,int(bars_v))

        # update the text labels with generated tab strings
        e1o.text = tab_gend[0]
        b2o.text = tab_gend[1]
        g3o.text = tab_gend[2]
        d4o.text = tab_gend[3]
        a5o.text = tab_gend[4]
        e6o.text = tab_gend[5]
    
    # this function is called in the settings screen, and changes the value of the global variable difficulty_v
    def difficulty_update(self,value):
        global difficulty_v
        difficulty_v = value
        print(difficulty_v)

        # update the homepage difficulty text
        difficultyo = self.root.ids['home_screen'].ids['diff']
        difficultyo.text = "Tab difficulty is " + value
        return

    def bars_update(self,value):
        global bars_v
        bars_v = value
        print(bars_v)

        # update the homepage difficulty text
        barso = self.root.ids['home_screen'].ids['bars']
        barso.text = "Number of bars: " + value
        return

    # this function is called in the settings screen, and changes the value of the global variable key_v
    def key_update(self,value):
        global key_v
        key_v = value
        print(key_v)

        # update the homepage key text
        keyo = self.root.ids['home_screen'].ids['key']
        keyo.text = "Key is " + value
        return

    # this function is called in the settings screen, and changes the value of the global variable note_v
    def note_update(self,value):
        global note_v
        note_v = value
        print(note_v)

        # update the homepage key text
        noteo = self.root.ids['home_screen'].ids['note']
        noteo.text = "Note Lengths are " + value + " notes"
        return

    # this function is called in the settings screen, and changes the value of the global variable scale_v
    def scale_update(self,value):
        global scale_v
        scale_v = value
        print(scale_v)

        # update the homepage scale text
        scaleo = self.root.ids['home_screen'].ids['scale']
        scaleo.text = "Scale is " + value
        return

    # Build the app
    def build(self):
        return GUI

    # screen manager
    def change_screen(self, screen_name):
        # h_txt = self.root.ids['home_screen'].ids['home_txt']
        # print(h_txt.text)
        # h_txt.text = "Welcome to the app! Click to Generate"
        # print(h_txt.text)
        # get the screen manager from the kv file
        print(self.root.ids['screen_manager'])
        screen_manager = self.root.ids['screen_manager']
        screen_manager.current = screen_name
        print(self.root)

MainApp().run()