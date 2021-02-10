package com.stud;

import com.stud.buildiers.CarBuilder;
import com.stud.buildiers.CarManualBuilder;
import com.stud.cars.Car;
import com.stud.cars.Manual;
import com.stud.director.Director;

public class Main {

    public static void main(String[] args) {
        Director director = new Director();
        CarBuilder builder = new CarBuilder();
        CarManualBuilder manualBuilder = new CarManualBuilder();

        director.constructSportsCar(builder);
        director.constructSportsCar(manualBuilder);

        Car car = builder.getResult();
        System.out.println("Car built:\n" + car.getCarType());
        Manual carManual = manualBuilder.getResult();
        System.out.println("\nCar manual built:\n" + carManual.print());

        director.constructCityCar(builder);
        director.constructCityCar(manualBuilder);

        Car Fiat126p = builder.getResult();
        Manual Fiat126pManual = manualBuilder.getResult();

        System.out.println("Car built:\n" + Fiat126p.getCarType());
        System.out.println("Volume of an engine in built car: \n" + Fiat126p.getEngine().getVolume());
        System.out.println("\nCar manual built:\n" + Fiat126pManual.print());
    }
}
