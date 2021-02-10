package com.stud.buildiers;

import com.stud.cars.CarType;
import com.stud.components.Engine;
import com.stud.components.GPSNavigator;
import com.stud.components.Transmission;
import com.stud.components.TripComputer;

public interface Builder {
    void setCarType(CarType type);
    void setSeats(int seats);
    void setEngine(Engine engine);
    void setTransmission(Transmission transmission);
    void setTripComputer(TripComputer tripComputer);
    void setGPSNavigator(GPSNavigator gpsNavigator);
}
