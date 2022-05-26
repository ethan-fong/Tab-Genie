package com.example.tabgenie.staticClasses;

import com.example.tabgenie.dataclass.Settings;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Random;

public class Functions {

    public static ArrayList<String> tabGen(Settings settings){
        HashMap<String,Integer> note_convert = new HashMap<String,Integer>();
        //lazy
        note_convert.put("quarter",4);
        note_convert.put("eighth",8);
        note_convert.put("triplet",3);
        note_convert.put("quaver triplet",6);
        System.out.println(settings);
        int note_type =  note_convert.get(settings.getNote());
        HashMap<String,Integer> difficulty_convert = new HashMap<String,Integer>();
        difficulty_convert.put("easy",6);
        difficulty_convert.put("medium",3);
        difficulty_convert.put("hard",2);
        int difficulty =  difficulty_convert.get(settings.getDifficulty());
        HashMap<String,Integer> key_convert = new HashMap<String,Integer>();
        //even lazier
        key_convert.put("E",0);
        key_convert.put("F",1);
        key_convert.put("F#",2);
        key_convert.put("G",3);
        key_convert.put("G#",4);
        key_convert.put("A",5);
        key_convert.put("Bb",6);
        key_convert.put("B",7);
        key_convert.put("C",8);
        key_convert.put("C#",9);
        key_convert.put("D",10);
        key_convert.put("Eb",11);
        int key_delta =  key_convert.get(settings.getKey());
        HashMap<String,ArrayList<Integer>> scale_convert = new HashMap<String,ArrayList<Integer>>();
        scale_convert.put("Minor Pentatonic",new ArrayList<Integer>(Arrays.asList(3,2,2,3,2)));
        scale_convert.put("Minor",new ArrayList<Integer>(Arrays.asList(2,1,2,2,1,2,2)));
        scale_convert.put("Blues",new ArrayList<Integer>(Arrays.asList(3,2,1,1,3,2)));
        scale_convert.put("Major",new ArrayList<Integer>(Arrays.asList(2,2,1,2,2,2,1)));
        scale_convert.put("Dorian",new ArrayList<Integer>(Arrays.asList(2,1,2,2,2,1,2)));
        ArrayList<Integer> scale_intervals = scale_convert.get(settings.getScale());
        ArrayList<ArrayList<Integer>> key_of_e_allowed = new ArrayList<ArrayList<Integer>>();
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(0)));
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(7)));
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(2)));
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(9)));
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(5)));
        key_of_e_allowed.add(new ArrayList<Integer>(Arrays.asList(0)));
        for(ArrayList<Integer> string : key_of_e_allowed){
            for(int interval:scale_intervals){
                int note = string.get(string.size()-1)+interval;
                if(note>12){
                    string.add((string.get(string.size()-1)+interval)%12);
                }
                else {
                    string.add((string.get(string.size()-1)+interval));
                }
            }
        }
        ArrayList<ArrayList<Integer>> new_key_allowed = new ArrayList<ArrayList<Integer>>();
        for(ArrayList<Integer> guitar_string:key_of_e_allowed){
            ArrayList<Integer> new_string_nos = new ArrayList<Integer>();
            for(int original:guitar_string){
                new_string_nos.add(key_delta+original);
            }
            for(Integer i : new_string_nos){
                if(i>12){
                    new_string_nos.set(new_string_nos.indexOf(i),i%12);
                }
            }
            new_key_allowed.add(new_string_nos);
        }
        for (int i = 0; i <6;i++){
            Collections.sort(new_key_allowed.get(i));
            new_key_allowed.set(i,new ArrayList<Integer>(new HashSet<Integer>(new_key_allowed.get(i))));
        }
        ArrayList<String> tab_out = new ArrayList<String>();
        tab_out.add("e|");
        tab_out.add("B|");
        tab_out.add("G|");
        tab_out.add("D|");
        tab_out.add("A|");
        tab_out.add("E|");
        ArrayList<Integer> index_max_list = new ArrayList<Integer>();
        for(ArrayList<Integer> i:new_key_allowed){
            index_max_list.add(i.size());
        }
        boolean bend = false;
        boolean pull = false;
        Random rand = new Random();
        int rand_string = rand.nextInt(6);
        int max = new_key_allowed.get(rand_string).size()-1;
        int rand_note = rand.nextInt((max) + 1);
        for(int bar = 0; bar< settings.getBars();bar++){
            for(int i = 0; i<note_type;i++){
                boolean made = false;
                int tempRandom = rand.nextInt((difficulty+2*(i%2)) + 1);
                if(!bend && !pull && tempRandom>1 && !(i==(note_type-1)) && !made){
                    for(int index = 0; index < tab_out.size();index++){
                        tab_out.set(index,tab_out.get(index)+"---");
                    }
                }
                else{
                    made = true;
                    if(!bend&&!pull){
                        int[] new_generated = Functions.gaussian_next_node(rand_string,rand_note,index_max_list);
                        rand_string = new_generated[0];
                        rand_note = new_generated[1];
                    }
                    else if(pull){
                        rand_note--;
                        pull = false;
                    }
                    else{
                        rand_note++;
                        bend = false;
                    }

                    if(rand_note<index_max_list.get(rand_string)-1 && rand_note!=0 && (rand.nextInt(3)==0)){
                        if(rand.nextBoolean()){
                            bend = true;
                            int special_type = rand.nextInt(3);
                            if(special_type==0){
                                if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"b");
                                }
                                else{
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"b-");
                                }
                            }
                            else if(special_type==1){
                                if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"h");
                                }
                                else{
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"h-");
                                }
                            }
                            else{
                                if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"/");
                                }
                                else{
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"/-");
                                }
                            }
                        }
                        else{
                            pull = true;
                            int special_type = rand.nextInt(2);
                            if(special_type==0){
                                if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"p");
                                }
                                else{
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"p-");
                                }
                            }
                            else {
                                if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"\\");
                                }
                                else{
                                    tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"\\-");
                                }
                            }
                        }
                    }
                    else if(String.valueOf(new_key_allowed.get(rand_string).get(rand_note)).length()>1){
                        tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"-");
                    }
                    else{
                        tab_out.set(rand_string,String.valueOf(tab_out.get(rand_string))+String.valueOf(new_key_allowed.get(rand_string).get(rand_note))+"--");
                    }
                    for(int k=0;k<6;k++){
                        if(rand_string!=k){
                            tab_out.set(k,tab_out.get(k)+"---");
                        }
                    }
                }
            }
            for(int s = 0;s<6;s++){
                tab_out.set(s,tab_out.get(s)+"|");
            }
        }
        return tab_out;
    }

    public static int[] gaussian_next_node(int prev_string, int prev_index, ArrayList<Integer> max_rand_note_list){
        int[] tuple = {0,0};
        int next_string = -1;
        int next_note_index = -1;

        int mu = prev_string;
        int sigma = 1;
        Random r = new Random();
        while(next_string<0 || next_string>5){
            next_string = (int) Math.round(r.nextGaussian()*mu+sigma);
        }
        int note_index_max = max_rand_note_list.get(next_string)-1;

        mu = prev_index;
        sigma = 1;
        while(next_note_index<1 || next_note_index>note_index_max){
            next_note_index = (int) Math.round(r.nextGaussian()*mu+sigma);
        }

        if(next_note_index == note_index_max){
            if(r.nextBoolean()){
                next_note_index--;
            }
        }
        if(next_note_index==0){
            if (r.nextBoolean()){
                next_note_index++;
            }
        }
        tuple[0] = next_string;
        tuple[1] = next_note_index-1;
        return tuple;
    }
}
