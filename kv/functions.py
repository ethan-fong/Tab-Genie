import random                                                                                                                   # import dependencies

# Things to add: timing on bottom of tab (1 + 2 + 3 + 4 +)

# Features: any key and scale, subsequent notes are related to the previous note through 2 gaussian pdfs for string and fret (leading to better flow),
# notes more likely generated on strong beats (1/3), special features such as bends and slides, bad luck protection so somethins always generated

def tab_gen(key_in,difficulty_in,scale_in,note_length,number_bars):                                                             # tab gen generates a 2D array of strings that correspond to the tab of each string. It takes in parameters to adjust generation
    note_convert = {"quarter":4,"eighth":8,"triplet":3,"quaver triplet":6}                                                      # parsing input arguments using dictionaries since input is a string
    note_type = note_convert[note_length]
    difficulty_convert = {"easy":6,"medium":3,"hard":2}
    difficulty = difficulty_convert[difficulty_in]
    key_convert = {"E":0,"F":1,"F#":2,"G":3,"G#":4,"A":5,"Bb":6,"B":7,"C":8,"C#":9,"D":10,"Eb":11}
    key_delta = key_convert[key_in]
    scale_convert = {"Minor Pentatonic":[3,2,2,3,2],"Minor":[2,1,2,2,1,2,2],"Blues":[3,2,1,1,3,2]\
    ,"Major":[2,2,1,2,2,2,1],"Dorian":[2,1,2,2,2,1,2]}
    scale_intervals = scale_convert[scale_in]
    key_of_e_allowed = [[0],[7],[2],[9],[5],[0]]                                                                                # where the note E is on each string
    for string in key_of_e_allowed:                                                                                             # building the scale from intervals here
        for interval in scale_intervals:
            note = string[-1]+interval                                                                                          # each note added is the previous note plus the current interval
            if note > 12:                                                                                                       # if we are past the 12th fret, we want to lower it to under 12th fret (which is an octave)
                string.append((string[-1]+interval)%12)                                                                         # modulo keeps note the same but brings it under 12 frets
            else:                                                                                                               #
                string.append((string[-1]+interval))                                                                            # originally under 12 frets so just add to allowed notes
    new_key_allowed = []                                                                                                        # transpose to new key here
    for guitar_string in key_of_e_allowed:                                                                                      # going to do it string by string
        new_string_nos = [key_delta + original for original in guitar_string]                                                   #
        for i in new_string_nos:                                                                                                # if anything is above the 12th fret, we can subtact an octave with the modulo function
            if i>12:
                new_string_nos[new_string_nos.index(i)] = i%12
        new_key_allowed.append(new_string_nos)
    for i in range(6):
        new_key_allowed[i] = sorted(set(new_key_allowed[i]))
    tab_out = ["e|","B|","G|","D|","A|","E|"]                                                                                   # generate tab, first by creating the scaffolding for the output - a 2D array of strings
    index_max_list = [len(i) for i in new_key_allowed]
    bend = False
    pull = False
    # print(index_max_list)
    rand_string = random.randint(0,5)                                                                                           # rand_note represents the string that the note will be generated on
    rand_note = random.randint(0,len(new_key_allowed[rand_string])-1)                                                           # choose a random note from the list of allowed/legal notes in the scale and key
    for bar in range(number_bars):                                                                                              # repeat for as many bars specified
        for i in range(note_type):                                                                                              # program will generate up to (note_length) notes in a bar
            made = False                                                                                                        # bad luck protection, if there isnt a note made in the bar, the program will generate a note at the last quarter note
            if not bend and not pull and random.randint(0,difficulty+2*(i%2))>1 and not(i==(note_type-1) and not made):         # the chance of generating a note is related to the difficulty setting
                tab_out = [st + "---" for st in tab_out]                                                                        # no note generated, add dashes to the text
            else:                                                                                                               
                made = True    
                if not bend and not pull:                                                                                       # end bad luck protection since a note is generated
                    new_generated = gaussian_next_note(rand_string,rand_note,index_max_list)  
                    rand_string = new_generated[0]                                                                              # rand_note represents the string that the note will be generated on
                    rand_note = new_generated[1]                                                                                # choose a random note from the list of allowed/legal notes in the scale and key
                elif pull:
                    rand_note -=1
                    pull = False
                else:
                    rand_note +=1
                    bend = False
                
                if rand_note < index_max_list[rand_string]-1 and rand_note != 0 and random.randint(0,2)==0:
                    if random.randint(0,1) == 0:
                        bend = True                                                                                             # bends and hammer on and slides will be treated the same here
                        special_type = random.randint(0,2)
                        if special_type == 0:
                            if len(str(new_key_allowed[rand_string][rand_note]))>1:                                             # depending on how long the note generated is ("10" takes 2 characters whereas "3" only takes 1) the program fills in the rest with dashes
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"b"      # note is two characters long, two dashes are needed
                            else:
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"b-"     # note is one character long, three dashes are needed
                        elif special_type == 1:
                            if len(str(new_key_allowed[rand_string][rand_note]))>1:                                             
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"h"      
                            else:
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"h-"     
                        else:
                            if len(str(new_key_allowed[rand_string][rand_note]))>1:                                             
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"/"      
                            else:
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"/-"    
                    else:                                                                                                       # other half the time a pull or slide down will be implemented
                        pull = True
                        special_type = random.randint(0,1)
                        if special_type == 0:
                            if len(str(new_key_allowed[rand_string][rand_note]))>1:                                             
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"p"      
                            else:
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"p-"     
                        elif special_type == 1:
                            if len(str(new_key_allowed[rand_string][rand_note]))>1:                                             
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"\\"      
                            else:
                                tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"\\-"     
                        
                elif len(str(new_key_allowed[rand_string][rand_note]))>1:                                                       
                    tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"-"                  
                else:
                    tab_out[rand_string]=tab_out[rand_string]+str(new_key_allowed[rand_string][rand_note])+"--"                 
                
                for k in range(6):                                                                                              # to fill in the other strings with dashes
                    if rand_string!=k:                                                                                          # string we are iterating over is not the string that we generated the note on
                        tab_out[k] = tab_out[k]+"---" 
        for s in range(6):                                                                                                      # add the bar dividers
            tab_out[s] = tab_out[s]+"|"
    return tab_out

def gaussian_next_note(prev_string,prev_index,max_rand_note_list):
    # output varibles
    next_string = -1
    next_note_index = -1
    
    # string first
    mu = prev_string
    sigma = 1

    while next_string < 0 or next_string>5:
        next_string = round(random.gauss(mu, sigma))
    
    # now note index
    note_index_max = max_rand_note_list[next_string]-1

    mu = prev_index
    sigma = 1
    while next_note_index<1 or next_note_index > note_index_max:
        next_note_index = round(random.gauss(mu, sigma))
    
    # bounce back randomness, so it isn't stuck on beginning or end of list
    if next_note_index == note_index_max:
        if random.randint(0,1)==0:
            next_note_index -= 1
    
    if next_note_index == 0:
        if random.randint(0,1)==0:
            next_note_index += 1
    

    return next_string, next_note_index -1
