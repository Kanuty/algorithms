package com.stud.components;

import com.stud.mediator.Mediator;

public interface Component {

    void setMediator(Mediator mediator);
    String getName();
}
