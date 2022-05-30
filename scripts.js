$.backstretch("background.jpg")


      
difficulty = "medium"
key = "E"
scale = "Minor Pentatonic"
note = "quarter"
bars = 3

function tab_gen(key_in, difficulty_in, scale_in, note_length, number_bars) {
  var bend, difficulty, difficulty_convert, index_max_list, key_convert, key_delta, key_of_e_allowed, made, new_generated, new_key_allowed, new_string_nos, note, note_convert, note_type, pull, rand_note, rand_string, scale_convert, scale_intervals, special_type, tab_out;
  note_convert = {
    "quarter": 4,
    "eighth": 8,
    "triplet": 3,
    "quaver triplet": 6
  };
  note_type = note_convert[note_length];
  difficulty_convert = {
    "easy": 6,
    "medium": 3,
    "hard": 2
  };
  difficulty = difficulty_convert[difficulty_in];
  key_convert = {
    "E": 0,
    "F": 1,
    "F#": 2,
    "G": 3,
    "G#": 4,
    "A": 5,
    "Bb": 6,
    "B": 7,
    "C": 8,
    "C#": 9,
    "D": 10,
    "Eb": 11
  };
  key_delta = key_convert[key_in];
  scale_convert = {
    "Minor Pentatonic": [3, 2, 2, 3, 2],
    "Minor": [2, 1, 2, 2, 1, 2, 2],
    "Blues": [3, 2, 1, 1, 3, 2],
    "Major": [2, 2, 1, 2, 2, 2, 1],
    "Dorian": [2, 1, 2, 2, 2, 1, 2]
  };
  scale_intervals = scale_convert[scale_in];
  key_of_e_allowed = [[0], [7], [2], [9], [5], [0]];

  for (var string, _pj_c = 0, _pj_a = key_of_e_allowed, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    string = _pj_a[_pj_c];

    for (var interval, _pj_f = 0, _pj_d = scale_intervals, _pj_e = _pj_d.length; _pj_f < _pj_e; _pj_f += 1) {
      interval = _pj_d[_pj_f];
      note = string.slice(-1)[0] + interval;

      if (note > 12) {
        string.push((string.slice(-1)[0] + interval) % 12);
      } else {
        string.push(string.slice(-1)[0] + interval);
      }
    }
  }

  new_key_allowed = [];

  for (var guitar_string, _pj_c = 0, _pj_a = key_of_e_allowed, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    guitar_string = _pj_a[_pj_c];

    new_string_nos = function () {
      var _pj_d = [],
          _pj_e = guitar_string;

      for (var _pj_f = 0, _pj_g = _pj_e.length; _pj_f < _pj_g; _pj_f += 1) {
        var original = _pj_e[_pj_f];

        _pj_d.push(key_delta + original);
      }

      return _pj_d;
    }.call(this);

    for (var i, _pj_f = 0, _pj_d = new_string_nos, _pj_e = _pj_d.length; _pj_f < _pj_e; _pj_f += 1) {
      i = _pj_d[_pj_f];

      if (i > 12) {
        new_string_nos[new_string_nos.indexOf(i)] = i % 12;
      }
    }

    new_key_allowed.push(new_string_nos);
  }

    for (var i = 0, _pj_a = 6; i < _pj_a; i += 1) {
    var tempnew_key_allowed = [];
    for (var x = 0; x < new_key_allowed[i].length; x+=1) {
      tempnew_key_allowed[x] = parseInt(new_key_allowed[i][x]);
    }
    var temparr = [...new Set(tempnew_key_allowed)]
    temparr.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});
    new_key_allowed[i] = temparr;
  }

  tab_out = ["e|", "B|", "G|", "D|", "A|", "E|"];

  index_max_list = function () {
    var _pj_a = [],
        _pj_b = new_key_allowed;

    for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
      var i = _pj_b[_pj_c];

      _pj_a.push(i.length);
    }

    return _pj_a;
  }.call(this);

  bend = false;
  pull = false;
  rand_string = Math.floor(Math.random() * 6);
  rand_note = Math.floor(Math.random() * new_key_allowed[rand_string].length);

  for (var bar = 0, _pj_a = number_bars; bar < _pj_a; bar += 1) {
    for (var i = 0, _pj_b = note_type; i < _pj_b; i += 1) {
      made = false;
      // console.log(bend)
      // console.log(pull)
      // console.log(note_type)
      // console.log(made)
      //console.log(Math.floor(Math.random()*difficulty+2*(i%2)))
      if(!bend && !pull && (Math.floor(Math.random()*difficulty+2*(i%2)+1) > 1) && !(i===(note_type-1)&&!made)){
        tab_out = function () {
          var _pj_c = [],
              _pj_d = tab_out;

          for (var _pj_e = 0, _pj_f = _pj_d.length; _pj_e < _pj_f; _pj_e += 1) {
            var st = _pj_d[_pj_e];

            _pj_c.push(st + "---");
          }

          return _pj_c;
        }.call(this);
      } else {
        made = true;

        if (!bend && !pull) {
          new_generated = gaussian_next_note(rand_string, rand_note, index_max_list);
          rand_string = new_generated[0];
          rand_note = new_generated[1];
        } else {
          if (pull) {
            rand_note -= 1;
            pull = false;
          } else {
            rand_note += 1;
            bend = false;
          }
        }

        if (rand_note < index_max_list[rand_string] - 1 && rand_note !== 0 && Math.floor(Math.random() *3) === 0) {
          if (Math.floor(Math.random() * 2)===0) {
            bend = true;
            special_type = Math.floor(Math.random() * 3);

            if (special_type === 0) {
              if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
                tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "b";
              } else {
                tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "b-";
              }
            } else {
              if (special_type === 1) {
                if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "h";
                } else {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "h-";
                }
              } else {
                if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "/";
                } else {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "/-";
                }
              }
            }
          } else {
            pull = true;
            special_type = Math.floor(Math.random() * 2);
            if (special_type === 0) {
              if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
                tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "p";
              } else {
                tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "p-";
              }
            } else {
              if (special_type === 1) {
                if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "\\";
                } else {
                  tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "\\-";
                }
              }
            }
          }
        } else {
          if (new_key_allowed[rand_string][rand_note].toString().length > 1) {
            tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "-";
          } else {
            tab_out[rand_string] = tab_out[rand_string] + new_key_allowed[rand_string][rand_note].toString() + "--";
          }
        }

        for (var k = 0, _pj_c = 6; k < _pj_c; k += 1) {
          if (rand_string !== k) {
            tab_out[k] = tab_out[k] + "---";
          }
        }
      }
    }

    for (var s = 0, _pj_b = 6; s < _pj_b; s += 1) {
      tab_out[s] = tab_out[s] + "|";
    }
  }

  return tab_out;
}
function generateGaussian(mean,std){
  var _2PI = Math.PI * 2;
  var u1 = Math.random();
  var u2 = Math.random();
  
  var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
  var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

  return z0 * std + mean;
}

function gaussian_next_note(prev_string, prev_index, max_rand_note_list) {
  var mu, next_note_index, next_string, note_index_max, sigma;
  next_string = -1;
  next_note_index = -1;
  mu = prev_string;
  sigma = 1;

  while (next_string < 0 || next_string > 5) {
  
    next_string = Math.floor(generateGaussian(mu,sigma));//gaussian
    console.log(next_string)
  }

  note_index_max = max_rand_note_list[next_string] - 1;
  mu = prev_index;
  sigma = 1;

  while (next_note_index < 1 || next_note_index > note_index_max) {
    
    next_note_index =Math.floor(generateGaussian(mu,sigma));//gaussian
    console.log(next_note_index)
  }

  if (next_note_index === note_index_max) {
    if (Math.floor(Math.random() *2) === 0) {
      next_note_index -= 1;
    }
  }

  if (next_note_index === 0) {
    if (Math.floor(Math.random() *2) === 0) {
      next_note_index += 1;
    }
  }

  return [next_string, next_note_index - 1];
}

function convert_to_string(ar) {
  return ar.join("\r\n");
}

function generate(){
  var bars_select = document.getElementById('bars');
  var value_bars = bars_select.options[bars_select.selectedIndex].value;

  var note_select = document.getElementById('note');
  var value_note = note_select.options[note_select.selectedIndex].value;

  var difficulty_select = document.getElementById('difficulty');
  var value_difficulty = difficulty_select.options[difficulty_select.selectedIndex].value;

  var key_select = document.getElementById('key');
  var value_key = key_select.options[key_select.selectedIndex].value;

  var scale_select = document.getElementById('scale');
  var value_scale = scale_select .options[scale_select.selectedIndex].value;

  localStorage.setItem("bars",value_bars);
  localStorage.setItem("note",value_note);
  localStorage.setItem("difficulty",value_difficulty);
  localStorage.setItem("key",value_key);
  localStorage.setItem("scale",value_scale);

  document.getElementById("note_text").innerHTML = "Note lengths are "+value_note+" notes";
  document.getElementById("bars_text").innerHTML = "Number of bars: "+value_bars
  document.getElementById("key_text").innerHTML = "Key is "+value_key
  document.getElementById("difficulty_text").innerHTML = "Tab Difficuly is "+value_difficulty
  document.getElementById("scale_text").innerHTML = "Scale is "+value_scale
  document.getElementById("tab_num_text").innerHTML = "Random Tab Number "+ Math.floor(Math.random() *501)

  // <center id="note_text">Note lengths are quarter notes</center>
  //   <center id="bars_text">Number of Bars:3</center>
  //   <center id="key_text">Key is E</center>
  //   <center id="difficulty_text">Tab Difficulty is medium</center>
  //   <center id="scale_text">Scale is Minor Pentatonic</center>
  //   <center id="tab_num_text">Random tab number: 0</center>


  document.getElementById("tab").innerHTML = convert_to_string(tab_gen(value_key,value_difficulty,value_scale,value_note,value_bars));
  //convert_to_string(tab_gen("E","medium","Minor Pentatonic","quarter",3));
  
  
  // difficulty_v = "medium"
  //   key_v = "E"
  //   scale_v = "Minor Pentatonic"
  //   note_v = "quarter"
  //   bars_v = 3
  document.getElementById("tab").style.fontFamily = "monospace"}




  