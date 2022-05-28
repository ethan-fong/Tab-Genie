package com.tabgenieproject.tabgenie.dataclass;

import java.io.Serializable;

public class Settings implements Serializable {
    public String Difficulty;
    public String Key;
    public String Scale;
    public String Note;
    public int bars;

    public Settings(){
    }

    public Settings(String difficulty, String key, String scale, String note, int bars) {
        this.Difficulty = difficulty;
        this.Key = key;
        this.Scale = scale;
        this.Note = note;
        this.bars = bars;
    }

    public String getDifficulty() {
        return Difficulty;
    }

    public void setDifficulty(String difficulty) {
        Difficulty = difficulty;
    }

    public String getKey() {
        return Key;
    }

    public void setKey(String key) {
        Key = key;
    }

    public String getScale() {
        return Scale;
    }

    public void setScale(String scale) {
        Scale = scale;
    }

    public String getNote() {
        return Note;
    }

    public void setNote(String note) {
        Note = note;
    }

    public int getBars() {
        return bars;
    }

    public void setBars(int bars) {
        this.bars = bars;
    }

    @Override
    public String toString() {
        return "Settings{" +
                "Difficulty='" + Difficulty + '\'' +
                ", Key='" + Key + '\'' +
                ", Scale='" + Scale + '\'' +
                ", Note='" + Note + '\'' +
                ", bars=" + bars +
                '}';
    }
}
