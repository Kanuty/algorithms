package com.stud;

public class SquarePeg {
    private double width;

    public SquarePeg(double width){
        this.width = width;
    }

    public double getWidth()
    {
        return width;
    }

    public double getSquere() {
        double result;
        result = Math.pow(this.width, 2);
        return result;
    }
}
