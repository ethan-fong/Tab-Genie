import * as random from 'random';


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
        string.append((string.slice(-1)[0] + interval) % 12);
      } else {
        string.append(string.slice(-1)[0] + interval);
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
        new_string_nos[new_string_nos.index(i)] = i % 12;
      }
    }

    new_key_allowed.append(new_string_nos);
  }

  for (var i = 0, _pj_a = 6; i < _pj_a; i += 1) {
    new_key_allowed[i] = sorted(set(new_key_allowed[i]));
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
  rand_string = random.randint(0, 5);
  rand_note = random.randint(0, new_key_allowed[rand_string].length - 1);

  for (var bar = 0, _pj_a = number_bars; bar < _pj_a; bar += 1) {
    for (var i = 0, _pj_b = note_type; i < _pj_b; i += 1) {
      made = false;

      if (!bend && !pull && random.randint(0, difficulty + 2 * (i % 2)) > 1 && !(i === note_type - 1 && !made)) {
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

        if (rand_note < index_max_list[rand_string] - 1 && rand_note !== 0 && random.randint(0, 2) === 0) {
          if (random.randint(0, 1) === 0) {
            bend = true;
            special_type = random.randint(0, 2);

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
            special_type = random.randint(0, 1);

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

function gaussian_next_note(prev_string, prev_index, max_rand_note_list) {
  var mu, next_note_index, next_string, note_index_max, sigma;
  next_string = -1;
  next_note_index = -1;
  mu = prev_string;
  sigma = 1;

  while (next_string < 0 || next_string > 5) {
    next_string = round(random.gauss(mu, sigma));
  }

  note_index_max = max_rand_note_list[next_string] - 1;
  mu = prev_index;
  sigma = 1;

  while (next_note_index < 1 || next_note_index > note_index_max) {
    next_note_index = round(random.gauss(mu, sigma));
    console.log("nni: ", next_note_index);
  }

  if (next_note_index === note_index_max) {
    if (random.randint(0, 1) === 0) {
      next_note_index -= 1;
    }
  }

  if (next_note_index === 0) {
    if (random.randint(0, 1) === 0) {
      next_note_index += 1;
    }
  }

  return [next_string, next_note_index - 1];
}

function convert_to_string(ar) {
  return "\n".join(ar);
}

function generate(){

    document.setElementById("tab").innerHTML = "test"//convert_to_string(tab_gen(key,difficulty,scale,note,bars));

}



