package com.stud.factories;

import com.stud.buttons.Button;
import com.stud.checkbox.Checkbox;

public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}
