package com.tabgenieproject.tabgenie.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;

import com.tabgenieproject.tabgenie.R;
import com.tabgenieproject.tabgenie.R;
import com.tabgenieproject.tabgenie.dataclass.Settings;

public class FirstPageActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first_page);
        TextView nextpage = (TextView) findViewById(R.id.letsgetstarted);
        nextpage.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.letsgetstarted:
                Intent i = new Intent(this,MainActivity.class);
                Settings default_settings = new Settings("medium","E","Minor Pentatonic","quarter",3);
                i.putExtra("setting",default_settings);
                startActivity(i);
                break;
        }

    }
}
