package com.stud;

public class SquarePegAdapter extends RoundPeg {
 private final SquarePeg peg;

 public SquarePegAdapter(SquarePeg peg){
     this.peg = peg;
 }

 @Override
 public double getRadius() {
     double radius;
     radius = (Math.sqrt(Math.pow((peg.getWidth() / 2), 2) * 2));
     return radius;
 }
}
