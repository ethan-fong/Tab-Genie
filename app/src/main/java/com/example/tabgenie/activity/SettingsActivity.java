package com.example.tabgenie.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Spinner;

import com.example.tabgenie.R;
import com.example.tabgenie.dataclass.Settings;

import java.util.Arrays;

public class SettingsActivity extends AppCompatActivity implements View.OnClickListener {
    Button home;
    Spinner bars_spinner,note_length_spinner,difficulty_spinner,key_spinner,scale_spinner;
    String[] notes = {"quarter","eighth","triplet","quaver triplet"};
    String[] difficulty = {"easy","medium","hard"};
    String[] key = {"E","F","F#","G","G#","A","Bb","B","C","C#","D","Eb"};
    String[] scale = {"Minor Pentatonic","Minor","Blues","Major","Dorian"};
    String[] bars = {"3","4","5"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);//force light mode
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        home = (Button) findViewById(R.id.home);
        home.setOnClickListener(this);

        bars_spinner = findViewById(R.id.bars_spinner);
        note_length_spinner = findViewById(R.id.note_length_spinner);
        difficulty_spinner = findViewById(R.id.difficulty_spinner);
        key_spinner = findViewById(R.id.key_spinner);
        scale_spinner = findViewById(R.id.scale_spinner);

        ArrayAdapter adapter = new ArrayAdapter(this,R.layout.spinner_section,bars);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        bars_spinner.setAdapter(adapter);

        ArrayAdapter adapter2 = new ArrayAdapter(this,R.layout.spinner_section,notes);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        note_length_spinner.setAdapter(adapter2);

        ArrayAdapter adapter3 = new ArrayAdapter(this,R.layout.spinner_section,difficulty);
        adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        difficulty_spinner.setAdapter(adapter3);

        ArrayAdapter adapter4 = new ArrayAdapter(this,R.layout.spinner_section,key);
        adapter4.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        key_spinner.setAdapter(adapter4);

        ArrayAdapter adapter5 = new ArrayAdapter(this,R.layout.spinner_section,scale);
        adapter5.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        scale_spinner.setAdapter(adapter5);

        Intent i = getIntent();
        Settings settings = (Settings)i.getSerializableExtra("setting");
        bars_spinner.setSelection(Arrays.asList(bars).indexOf(Integer.toString(settings.getBars())));
        note_length_spinner.setSelection(Arrays.asList(notes).indexOf(settings.getNote()));
        difficulty_spinner.setSelection(Arrays.asList(difficulty).indexOf(settings.getNote()));
        key_spinner.setSelection(Arrays.asList(key).indexOf(settings.getNote()));
        scale_spinner.setSelection(Arrays.asList(scale).indexOf(settings.getNote()));
    }


    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.home:
                Intent i = new Intent(this,MainActivity.class);
                Settings s = new Settings(difficulty_spinner.getSelectedItem().toString(),key_spinner.getSelectedItem().toString()
                        ,scale_spinner.getSelectedItem().toString(),note_length_spinner.getSelectedItem().toString(),
                        Integer.parseInt(bars_spinner.getSelectedItem().toString()));
                i.putExtra("setting",s);
                startActivity(i);
                break;
        }
    }
}