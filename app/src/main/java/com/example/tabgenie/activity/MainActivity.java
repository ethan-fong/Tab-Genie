package com.example.tabgenie.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import com.example.tabgenie.R;
import com.example.tabgenie.dataclass.Settings;
import com.example.tabgenie.staticClasses.Functions;

import java.util.ArrayList;
import java.util.Random;
/*
Doesn't work on small phones.
 */
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    ImageButton generate, settings_button;
    TextView tab_out_text,note_length_text,bars_text,key_text,diff_text,scale_text,tab_num_text;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);//force light mode
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        generate = (ImageButton) findViewById(R.id.generate);
        generate.setOnClickListener(this);
        settings_button = (ImageButton) findViewById(R.id.settings);
        settings_button.setOnClickListener(this);
        tab_out_text = (TextView) findViewById(R.id.tab_out_text);
        note_length_text = (TextView) findViewById(R.id.note_length_text);
        bars_text = (TextView) findViewById(R.id.bars_text);
        key_text = (TextView) findViewById(R.id.key_text);
        diff_text = (TextView) findViewById(R.id.diff_text);
        scale_text = (TextView) findViewById(R.id.scale_text);
        tab_num_text = (TextView) findViewById(R.id.tab_num_text);
        Intent i = getIntent();
        Settings settings = (Settings)i.getSerializableExtra("setting");
        String noteLength = "Note lengths are "+ settings.getNote()+ " notes";
        note_length_text.setText(noteLength);
        String barLength = "Number of Bars: "+settings.getBars();
        bars_text.setText(barLength);
        String key = "Key is "+settings.getKey();
        key_text.setText(key);
        String diff = "Tab Difficulty is "+settings.getDifficulty();
        diff_text.setText(diff);
        String scale = "Key is "+settings.getScale();
        scale_text.setText(scale);

    }
    public void generate(){
        Intent i = getIntent();
        Settings settings = (Settings)i.getSerializableExtra("setting");
        ArrayList<String> tab_out = Functions.tabGen(settings);
        String joined = TextUtils.join("\n",tab_out);
        tab_out_text.setText(joined);
        Random r = new Random();
        String tabNum = "Random tab number: "+ r.nextInt(501);
        tab_num_text.setText(tabNum);
    }
    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.generate:
                generate();
                generate();
                break;
            case R.id.settings:
                Intent i = new Intent(this,SettingsActivity.class);
                Intent o = getIntent();
                Settings settings = (Settings)o.getSerializableExtra("setting");
                i.putExtra("setting",settings);
                startActivity(i);
        }
    }
}